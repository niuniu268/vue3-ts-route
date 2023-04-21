<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="user name">
                <el-input v-model="selectData.userName" placeholder="Input searching username" />
            </el-form-item>
                <el-form-item label="role name">
                    <el-select v-model="selectData.role" placeholder="please select" class="m-2">
                        <el-option label="all" :value="0"></el-option>
                        <el-option
                        v-for="item in rolelist"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                        />
                    </el-select>
                </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="nickName" label="Nickname" width="180" />
                <el-table-column prop="role" label="Role" width="180">
                    <template #default="scope">
                        <el-button
                        v-for="item in scope.row.role"
                        size="small"
                        :key="item.role"
                        link
                        >
                        {{ item.roleName }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="Operate" width="180">
                    <template #default="scope">
                        <el-button
                        size="small"
                        type="primary"
                        link
                        @click="changeUser(scope.row)"
                        >
                        Edit
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog
                v-model="isShow"
                title="Edit information"
            >
                <span>Edit this information</span>
                <el-form :model="active">
                    <el-form-item>
                        <el-input v-model="active.nickName" />
                    </el-form-item>
                    <el-form-item>
                        <el-select multiple v-model="active.role" placeholder="please select">
                            <el-option
                            v-for="item in rolelist"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isShow = false" >Cancel</el-button>
                    <el-button type="primary" @click="confirmInformation">Confirm</el-button>

                </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted,watch } from "vue";
import {getUserList, getRoleList} from '../request/api';
import { initData} from "../type/userlist";
import { listUserInt } from "../type/userlist";

export default defineComponent({
    setup() {
        onMounted(() => {
            getUser();
            getRole()
        });
        const getUser = ()=>{getUserList().then(res=>{
            // console.log(res.data);
            data.list = res.data

        })}
        const getRole = ()=>{getRoleList().then(res=>{
            // console.log(res.data);
            data.rolelist=res.data
        })}

        const data = reactive(new initData())
        console.log(data)


        const onSubmit = ()=>{ 
            // console.log(data.selectData.role)
            // console.log(data.selectData)
            let arr: listUserInt[]=[];
            if(data.selectData.userName || data.selectData.role){
                if(data.selectData.userName){
                    arr = data.list.filter((value)=>{
                        return value.userName.indexOf(data.selectData.userName) != -1
                    });
                }
                if(data.selectData.role){
                    arr = (data.selectData.userName?arr:data.list).filter((value)=>{
                        return value.role.find((item)=>
                            item.role===data.selectData.role
                            // console.log(item.role===data.selectData.role)
                        )
                    })
                }

            }else{
                arr = data.list
            }
            data.list=arr;
        };
        watch([()=>data.selectData.userName,()=>data.selectData.role],
        ()=>{
            if(data.selectData.userName=="" && data.selectData.role==0){
                getRole();
                getUser()
            }
        })

        const changeUser = (row:listUserInt)=>{
            console.log(row);
            data.isShow=true
            data.active ={
                id: row.id,
                nickName: row.nickName,
                role: row.role.map((value)=>value.role),
                userName:""
            }
        }

        const confirmInformation = ()=>{
            console.log(data.active) 
            data.isShow=false
            let target:any = data.list.find((value)=>value.id===data.active.id)
            target.nickName = data.active.nickName
            target.role.splice(0,target.role.length)
            target.role = data.rolelist.filter((value)=>data.active.role.indexOf(value.roleId)!==-1)
            console.log(target.role)
            data.list.forEach((item, i)=>{
                if(item.id==target.id){
                    data.list[i]=target
                }
            })
        }
        return{...toRefs(data),onSubmit,onMounted,changeUser,confirmInformation};
    }
    
})
</script>
<style lang="scss" scoped>
    
</style>
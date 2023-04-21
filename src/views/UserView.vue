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
            </el-table>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from "vue";
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
        }

        return{...toRefs(data),onSubmit,onMounted};
    }
    
})
</script>
<style lang="scss" scoped>
    
</style>
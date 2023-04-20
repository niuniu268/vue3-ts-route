<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="user name">
                <el-input v-model="selectData.userName" placeholder="Input searching username" />
            </el-form-item>
            <el-form-item label="role name">
                <el-input v-model="selectData.role" placeholder="Input searching role" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onsubmit">Query</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="nickName" label="Nickname" width="180" />
                <el-table-column prop="role" label="Role" width="180" />
            </el-table>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from "vue";
import {getUserList, getRoleList} from '../request/api';
import { initData} from "../type/userlist";
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

        const  data = reactive(new initData())
        console.log(data)

        const onSubmit = ()=>{ return null}

        return{...toRefs(data), onsubmit,onMounted};
    }
    
})
</script>
<style lang="scss" scoped>
    
</style>
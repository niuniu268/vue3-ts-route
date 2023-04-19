<template lang="">
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="title">
                <el-input v-model="selectData.goodname" placeholder="Input searching word" />
            </el-form-item>
            <el-form-item label="introduce">
                <el-input v-model="selectData.description" placeholder="Input searching word" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="dataList.comlist" border style="width: 100%">
                <el-table-column prop="goodId" label="ID" width="180" />
                <el-table-column prop="goodname" label="Name" width="180" />
                <el-table-column prop="description" label="Description" width="180" />
            </el-table>
            <el-pagination @current-change = currentChange @size-change = sizeChange layout="prev, pager, next" :total="50" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive,toRefs, computed } from "vue";
import { getGoodList } from "../request/api";
import { initData } from "../type/goodlist";
export default defineComponent({
    setup() {
        const data = reactive( new initData())
        getGoodList().then(res => {
            // console.log(res.data);
            data.list = res.data
            data.selectData.count= res.data.length
        });
        const currentChange = (page:number )=>{
            data.selectData.page=page
        };
        const sizeChange = (pagesize:number)=>{
            data.selectData.pagesize = pagesize
        };

        const dataList = reactive({
            comlist:computed(()=>{
                return data.list.slice ((data.selectData.page-1)*data.selectData.pagesize,
                data.selectData.page*data.selectData.pagesize)
            })

        })
        

        return{...toRefs(data),currentChange,sizeChange, dataList};
    },
});
</script>
<style lang="scss" scoped>
    
</style>
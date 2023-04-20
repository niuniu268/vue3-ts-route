<template>
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
            <el-pagination 
                @current-change = currentChange 
                @size-change = sizeChange 
                layout="prev, pager, next" 
                :total="selectData.count*2" 
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive,toRefs, computed,watch } from "vue";
import { getGoodList } from "../request/api";
import { initData, listInt } from "../type/goodlist";
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
        const onSubmit = ()=>{
            console.log(data.selectData.goodname);
            console.log(data.selectData.description);
            let arr:listInt[]=[]
            if(data.selectData.goodname || data.selectData.description){
                if(data.selectData.goodname){
                    arr = data.list.filter((value)=>{
                        return value.goodname.indexOf(data.selectData.goodname) != -1
                        }
                    )
                }
                if(data.selectData.description){
                    arr = data.list.filter((value)=>{
                        return value.goodname.indexOf(data.selectData.description) != -1
                        }
                    )
                }
            } else {
                arr = data.list
            }
            data.selectData.count=arr.length
            data.list=arr
        };
        watch([()=>data.selectData.goodname,()=>data.selectData.description],
        ()=>{
            if(data.selectData.goodname == "" && data.selectData.description == ""){
                getGoodList().then((res)=> {
                    data.list = res.data;
                    data.selectData.count = res.data.length;
                });
            }

        })
        return{...toRefs(data),currentChange,sizeChange,dataList,onSubmit};
    },
});
</script>
<style lang="scss" scoped>
    
</style>
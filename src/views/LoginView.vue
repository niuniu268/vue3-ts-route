<template>
    <div class="login-box">
        <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
  >

    <el-form-item label="Username" prop="Username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Password" prop="Password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>
    </div>

</template>


<script lang="ts" >
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router";
export default defineComponent(
    {
        setup(){
        
        const router = useRouter()

        const data = reactive( new LoginData());
        const rules =  {
                username:[
                    {
                        required: true,
                        message: "please input activity name",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "length should be 3 to 5",
                        trigger: "blue",
                    }
                ],
                password:[
                    {
                        required: true,
                        message: "please input activity password",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "length should be 3 to 5",
                        trigger: "blue",
                    }
                ],
            };
            const ruleFormRef = ref<FormInstance>() 
            const submitForm = (formEl: FormInstance | undefined) => {
                if (!formEl) return;
                formEl.validate((valid) => {
                    if (valid) {
                    // console.log('submit!')
                    login(data.ruleForm).then((res)=>{
                        // console.log(res);
                        localStorage.setItem('token', res.data.token);
                        router.push('/');
                    })
                    } else {
                    console.log('error submit!')
                    return false;
                    }
                }) 

            };
            const resetForm = ()=>{
                data.ruleForm.username = "";
                data.ruleForm.password = "";
            }
        return{...toRefs(data), rules, resetForm, ruleFormRef, submitForm};
    
    }
        
    }
);


</script>

<style  lang="scss" scoped>
    .login-box{
        widows: 100%;
        height: 100%;
        background: url(../Desert1.jpg);


    }
    .demo-ruleForm{
        width: 500px;
        margin: 200px;
        background-color: white;
        padding: 30px;
        border-radius: 20px;

    }

</style>
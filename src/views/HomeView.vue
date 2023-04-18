<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="../assets/logo.png" class = "logo" /></el-col>
          <el-col :span="16"><h2>management system</h2></el-col>
          <el-col :span="4"><span class="quit"> text register </span></el-col>
      </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            router
            class="el-menu-vertical-demo"
          >
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <RouterView>
            
          </RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "HomeView",
  setup(){
    const router = useRouter()
    console.log(router.getRoutes())
    const list = router.getRoutes().filter(v => v.meta.isshow)
    console.log(list)
    return{list}
  },
  components:{},
})
</script>

<style lang="scss" scoped>

.el-header{
  height: 80px;
  background-color: aqua;
  .logo{
  height: 80px;
}
h2,.quit{
  text-align: center;
  height: 80px;
  line-height: 80px;
}
}
.el-aside{
  .el-menu{
    height: calc(100vh - 80px);
  }
  width: 250px;

}

</style>
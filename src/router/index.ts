import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path:"goods",
        name: "goods",
        meta:{
        isshow: true,
        title:"goodslist"
        },
        component:() => import('../views/GoodsView.vue')
      },
      {
        path:"users",
        name: "users",
        meta:{
          isshow: true,
          title:"userlist"
        },
        component:() => import('../views/UserView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  const token:string | null = localStorage.getItem('token')
  if(!token&& to.path!=='/login'){
    next('/login')
  }else{
    next()
  }

})
export default router

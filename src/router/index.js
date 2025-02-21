import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/views/Login.vue'
import RegisterPage from '@/views/Register.vue'
import HomePage from '@/views/Home.vue' 
import hospital from '@/views/Home.vue' 
import AboutUs from '@/views/Home.vue' 
import Team from '@/views/Home.vue' 
import TeamCarousel from '@/views/Home.vue' 
import PetInfo from '@/views/Home.vue' 
import User from '@/views/User.vue' 


Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',  // 设置默认路由，访问根路径时会跳转到 Home 页面
        name: 'home',
        component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
        path: '/hospital',
        name: 'hospital',
        component: hospital 
      },
      {
        path: '/aboutUs',
        name: 'aboutUs',
        component: AboutUs 
      },
      {
        path: '/team',
        name: 'team',
        component: Team 
      },
      {
        path: '/TeamCarousel',
        name: 'TeamCarousel',
        component: TeamCarousel 
      },
      {
        path: '/PetInfo',
        name: 'PetInfo',
        component: PetInfo 
      },
      {
        path: '/User',
        name: 'User',
        component: User 
      },
  ]
})
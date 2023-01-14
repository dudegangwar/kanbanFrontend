import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/summary',
    name: 'Summary',
    component: function () {
      return import('../views/SummaryView.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import('../views/LoginView.vue')
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: function () {
      return import('../views/RegisterView.vue')
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history', 
})

export default router

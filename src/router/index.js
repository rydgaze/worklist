import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import { auth } from "@/firebase/config"

// Route guard
const requireAuth = (to, from, next) => {
  let user = auth.currentUser  
  if (!user) {
    next({name:'login'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

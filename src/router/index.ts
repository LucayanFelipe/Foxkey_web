import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' //importando o auth

import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import HomeView from '@/views/HomeView.vue'
import Table from '@/components/Table.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
    path: '/dashboard',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }, //aqui valida
    },
    {
      path: '/tables',
      name: 'tables',
      component: Table,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  const isPublic = ['login', 'register', 'forgot-password'].includes(to.name as string)
  const isLoggedIn = !!auth.token

  if (!isPublic && !isLoggedIn) {
    //return next({ name: 'login' })
  }

  next()
})

export default router

import { createRouter, createWebHistory } from 'vue-router'


import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import HomeView from '@/views/HomeView.vue'
import Table from '@/components/Table.vue'
import ConsultaClientes from '@/views/ConsultaClientes.vue'
import CadastroClientes from '@/views/CadastroClientes.vue'
import ConsultaProdutos from '@/views/ConsultaProdutos.vue'
import CadastroProdutos from '@/views/CadastroProdutos.vue'
import ConsultaFuncionarios from '@/views/ConsultaFuncionarios.vue'
import CadastroFuncionarios from '@/views/CadastroFuncionarios.vue'
import ConsultaFornecedores from '@/views/ConsultaFornecedores.vue'
import PerfilUsuario from '@/views/PerfilUsuario.vue'
import ConsultaEstoque from '@/views/ConsultaEstoque.vue'
import ConsultaRelatorioCaixa from '@/views/consultaRelatorioCaixa.vue'


const router = createRouter({
  history: createWebHistory(),
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
    meta: { requiresAuth: true }, //aqui protege a rota
    },
    {
      path: '/tables',
      name: 'tables',
      component: Table,
    },
      {
      path: '/perfilusuario',
      name: 'perfilusuario',
      component: PerfilUsuario,
      meta: { requiresAuth: true }, //aqui protege a rota
    },
    {
      path: '/consultaclientes',
      name: 'consultaclientes',
      component: ConsultaClientes,
      meta: { requiresAuth: true }, //aqui protege a rota
    },
     {
      path: '/cadastroclientes',
      name: 'cadastroclientes',
      component: CadastroClientes,
      meta: { requiresAuth: true }, //aqui protege a rota
    },
    {
      path: '/consultaprodutos',
      name: 'consultaprodutos',
      component: ConsultaProdutos,
      meta: { requiresAuth: true }, //aqui protege a rota
    },
     {
      path: '/cadastroprodutos',
      name: 'cadastroprodutos',
      component: CadastroProdutos,
      meta: { requiresAuth: true }, //aqui protege a rota
    },
    {
      path: '/consultafuncionarios',
      name: 'consultafuncionarios',
      component: ConsultaFuncionarios,
      meta: { requiresAuth: true }, //aqui protege a rota
    },
    {
      path: '/cadastrofuncionarios',
      name: 'cadastrofuncionarios',
      component: CadastroFuncionarios,
      meta: { requiresAuth: true }, //aqui protege a rota
    },
    {
      path: '/consultafornecedores',
      name: 'consultafornecedores',
      component: ConsultaFornecedores,
      meta: { requiresAuth: true }, //aqui protege a rota
    },

     {
      path: '/consultaestoque',
      name: 'consultaestoque',
      component: ConsultaEstoque,
      meta: { requiresAuth: true }, //aqui protege a rota
    },

        {
      path: '/consultarelatoriocaixa',
      name: 'consultarelatoriocaixa',
      component: ConsultaRelatorioCaixa,
      meta: { requiresAuth: true }, //aqui protege a rota
    },
    
  ],
})


// Proteção de rota
router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem('usuario');

  if (to.meta.requiresAuth && !usuario) {
    next('/');
  } else {
    next();
  }
});

export default router

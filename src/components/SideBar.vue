<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
      <div class="sidebar-brand-text mx-3">FoxKey</div>
    </router-link>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link class="nav-link" to="/dashboard">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Home</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Menu</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseClientes"
        aria-expanded="true"
        aria-controls="collapseClientes"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Clientes</span>
      </a>
      <div
        id="collapseClientes"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/buttons">Cadastrar</router-link>
          <router-link class="collapse-item" to="/cards">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseProdutos"
        aria-expanded="true"
        aria-controls="collapseProdutos"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Produtos</span>
      </a>
      <div
        id="collapseProdutos"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/buttons">Cadastrar</router-link>
          <router-link class="collapse-item" to="/cards">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseFuncionarios"
        aria-expanded="true"
        aria-controls="collapseFuncionarios"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Funcionários</span>
      </a>
      <div
        id="collapseFuncionarios"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/buttons">Cadastrar</router-link>
          <router-link class="collapse-item" to="/cards">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseDespesas"
        aria-expanded="true"
        aria-controls="collapseDespesas"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Despesas</span>
      </a>
      <div
        id="collapseDespesas"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/buttons">Cadastrar</router-link>
          <router-link class="collapse-item" to="/cards">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseRelatorios"
        aria-expanded="true"
        aria-controls="collapseRelatorios"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Relatórios</span>
      </a>
      <div
        id="collapseRelatorios"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/buttons">Cadastrar</router-link>
          <router-link class="collapse-item" to="/cards">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseVendas"
        aria-expanded="true"
        aria-controls="collapseVendas"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Vendas</span>
      </a>
      <div
        id="collapseVendas"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/buttons">Cadastrar</router-link>
          <router-link class="collapse-item" to="/cards">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseEstoque"
        aria-expanded="true"
        aria-controls="collapseEstoque"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Estoque</span>
      </a>
      <div
        id="collapseEstoque"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/buttons">Cadastrar</router-link>
          <router-link class="collapse-item" to="/cards">Consultar</router-link>
        </div>
      </div>
    </li>
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
  
</template>

<script lang="ts">
export default {
  name: "SidebarMenu"
}
</script>
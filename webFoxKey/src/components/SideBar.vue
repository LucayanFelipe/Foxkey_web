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
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseClientes" aria-expanded="true"
        aria-controls="collapseClientes">
        <i class="fas fa-fw fa-cog"></i>
        <span>Clientes</span>
      </a>
      <div id="collapseClientes" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/cadastroclientes">Cadastrar</router-link>
          <router-link class="collapse-item" to="/consultaclientes">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProdutos" aria-expanded="true"
        aria-controls="collapseProdutos">
        <i class="fas fa-fw fa-cog"></i>
        <span>Produtos</span>
      </a>
      <div id="collapseProdutos" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/cadastroprodutos">Cadastrar</router-link>
          <router-link class="collapse-item" to="/consultaprodutos">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseFuncionarios"
        aria-expanded="true" aria-controls="collapseFuncionarios">
        <i class="fas fa-fw fa-cog"></i>
        <span>Funcionários</span>
      </a>
      <div id="collapseFuncionarios" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/cadastrofuncionarios">Cadastrar</router-link>
          <router-link class="collapse-item" to="/consultafuncionarios">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseDespesas" aria-expanded="true"
        aria-controls="collapseDespesas">
        <i class="fas fa-fw fa-cog"></i>
        <span>Fornecedores</span>
      </a>
      <div id="collapseDespesas" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="#">Cadastrar</router-link>
          <router-link class="collapse-item" to="/consultafornecedores">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseRelatorios"
        aria-expanded="true" aria-controls="collapseRelatorios">
        <i class="fas fa-fw fa-cog"></i>
        <span>Relatórios</span>
      </a>
      <div id="collapseRelatorios" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/consultarelatoriocaixa">Caixa</router-link>
          <router-link class="collapse-item" to="#">Venda</router-link>
          <router-link class="collapse-item" to="#">Compra</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseVendas" aria-expanded="true"
        aria-controls="collapseVendas">
        <i class="fas fa-fw fa-cog"></i>
        <span>Vendas</span>
      </a>
      <div id="collapseVendas" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="#">Nova venda</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEstoque" aria-expanded="true"
        aria-controls="collapseEstoque">
        <i class="fas fa-fw fa-cog"></i>
        <span>Estoque</span>
      </a>
      <div id="collapseEstoque" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="#">Repor Estoque</router-link>
          <router-link class="collapse-item" to="/consultaestoque">Consultar</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseDespesa" aria-expanded="true"
        aria-controls="collapseDespesa">
        <i class="fas fa-fw fa-cog"></i>
        <span>Despesas</span>
      </a>
      <div id="collapseDespesa" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="#">Cadastrar</router-link>
          <router-link class="collapse-item" to="#">Consultar</router-link>
        </div>
      </div>
    </li>
  </ul>

</template>

<script lang="ts">
export default {
  name: "SidebarMenu"
}
</script>
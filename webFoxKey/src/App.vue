<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    // Você pode adicionar lógica global aqui se necessário
    return {}
  }
})
</script>

<template>
  <!-- Container principal para toda a aplicação -->
  <div id="app">
    <!-- Aqui serão renderizadas as views/páginas do router -->
    <RouterView />
  </div>
</template>

<style>
/* Estilos globais podem ser adicionados aqui */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>
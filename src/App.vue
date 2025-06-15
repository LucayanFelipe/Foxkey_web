<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink, RouterView } from 'vue-router'


export default defineComponent({
  name: 'App',
  setup() {
    const auth = useAuthStore()

    onMounted(() => {
      if (auth.token && !auth.user) {
        auth.loadUserFromToken()
      }
    })
  }
})


</script>

<template>
  <RouterView />
</template>
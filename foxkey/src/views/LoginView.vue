<template>
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner">
        <div class="card">
          <div class="card-body">
            <div class="app-brand justify-content-center mb-4">
              <router-link to="/" class="app-brand-link gap-2">
                <img style="width: 50px" src="../components/icons/foxkey.png" />
                <span class="app-brand-text demo text-body fw-bolder">FoxKey</span>
              </router-link>
            </div>

            <h4 class="mb-2">Bem vindo ao FoxKey 👋</h4>
            <p class="mb-4">Por favor insira seus dados</p>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email ou usuário</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  placeholder="Digite seu email ou usuário"
                  autofocus
                />
              </div>

              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">Senha</label>
                  <router-link to="/forgot-password">
                    <small>Esqueceu sua senha?</small>
                  </router-link>
                </div>
                <div class="input-group input-group-merge">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    class="form-control"
                    v-model="form.password"
                    placeholder="********"
                  />
                  <span class="input-group-text cursor-pointer" @click="togglePassword">
                    <i :class="showPassword ? 'bx bx-show' : 'bx bx-hide'"></i>
                  </span>
                </div>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="remember-me"
                    v-model="form.remember"
                  />
                  <label class="form-check-label" for="remember-me"> Lembre-se de mim </label>
                </div>
              </div>

              <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" type="submit">Acessar</button>
              </div>
            </form>

            <p class="text-center">
              <span>Novo aqui?</span>
              <router-link to="/register">
                <span>Crie uma conta!</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false,
      },
      showPassword: false,
    }
  },
  methods: {
    handleLogin() {
      console.log('Login info:', this.form)
      // Aqui você pode fazer chamada a API, validações etc.
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>

<style scoped>
/* Se necessário, importe CSS externo ou use o Vue CLI para importar globalmente */
</style>

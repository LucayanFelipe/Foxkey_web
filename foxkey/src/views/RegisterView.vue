<template>
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner">
        <div class="card">
          <div class="card-body">
            <!-- Logo -->

            <div class="app-brand justify-content-center mb-4">
              <router-link to="/" class="app-brand-link gap-2">
                <img style="width: 50px" src="../components/icons/foxkey.png" />
                <span class="app-brand-text demo text-body fw-bolder">FoxKey</span>
              </router-link>
            </div>

            <h4 class="mb-2">Estamos quase lá 🚀</h4>
            <p class="mb-4">Faça sua gestão fácil e segura!</p>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="username" class="form-label">Usuário</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  v-model="form.username"
                  placeholder="Digite o usuario"
                  autofocus
                />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="form.email"
                  placeholder="Digite seu email"
                />
              </div>

              <div class="mb-3 form-password-toggle">
                <label class="form-label" for="password">Senha</label>
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
                    id="terms-conditions"
                    v-model="form.agree"
                  />
                  <label class="form-check-label" for="terms-conditions">
                    Eu concordo com
                    <a href="#">As políticas de privacidades & termos</a>
                  </label>
                </div>
              </div>

              <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" type="submit">Cadastre-se</button>
              </div>
            </form>

            <p class="text-center">
              <span>Já tem uma conta?</span>
              <router-link to="/login">
                <span>Faça seu acesso</span>
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
  name: 'RegisterView',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        agree: false,
      },
      showPassword: false,
    }
  },
  methods: {
    handleRegister() {
      if (!this.form.agree) {
        alert('You must agree to the terms and conditions.')
        return
      }

      console.log('Register form:', this.form)
      // Aqui você pode chamar uma API de cadastro
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>

<style scoped>
/* Estilos específicos, se precisar */
</style>

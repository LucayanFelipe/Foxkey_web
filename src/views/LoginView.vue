<template>
    <div class="bg-gradient-primary">
        <div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    
                    <div class="card-body p-0">
                       
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>

                            <div class="col-lg-6">
                                
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Bem-vindo de volta!</h1>
                                    </div>
                                    
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                  v-model="form.email"

                                                placeholder="Digite seu e-mail...">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                              v-model="form.senha"
                                                id="exampleInputPassword" placeholder="Digite sua senha...">
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Lembrar de mim</label>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-primary btn-user btn-block" @click="handleLogin">
                                        Entrar
                                        </button>

                                        <hr>
                                        <a hrief="index.html" class="btn btn-google btn-user btn-block">
                                            <i class="fab fa-google fa-fw"></i> Login com Google
                                        </a>
                                        <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                            <i class="fab fa-facebook-f fa-fw"></i> Login com Facebook
                                        </a>
                                    </form>
                                    <hr>
                                    <div class="text-center">
                      <router-link to="/forgot-password" class="small">Esqueceu sua senha?</router-link>
                    </div>
                    <div class="text-center">
                      <router-link to="/register" class="small">Crie sua conta!</router-link>
                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { defineComponent, reactive, ref, onMounted } from 'vue'



export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const auth = useAuthStore()

    const form = reactive({
      email: '',
      senha: '',
      remember: false,
    })

    const showPassword = ref(false)

    onMounted(() => {
      if (auth.token) {
        router.push('/')
      }
    })

    const handleLogin = async () => {
      try {
        await auth.login(form.email, form.senha)
        router.push('/dashboard')
      } catch (err) {
        alert('Usuário ou senha inválidos')
        console.error(err)
      }
    }

    return {
      form,
      handleLogin,
      showPassword,
    }
  },
})

</script>

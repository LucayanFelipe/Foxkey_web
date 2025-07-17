<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg" style="margin-bottom:1em; margin-top: 1.5em;">

            <div class="card-body p-0">
              <div class="row align-items-center">
                <!-- Coluna para a logo -->

                <!-- Nested Row within Card Body -->
                <div class="row">


                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>

                  <div class="col-lg-6">
                    <div class="p-5">

                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Bem-vindo querido usuário!</h1>
                      </div>

                      <form class="user" @submit.prevent="handleLogin">
                        <div class="form-group">
                          <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                            aria-describedby="emailHelp" v-model="email" placeholder="Digite seu e-mail..."
                            @keyup.enter="handleLogin">
                        </div>
                        <div class="form-group">
                          <input type="password" class="form-control form-control-user" v-model="senha"
                            id="exampleInputPassword" placeholder="Digite sua senha...">
                        </div>
                        <div class="form-group">
                          <div class="custom-control custom-checkbox small">
                            <input type="checkbox" class="custom-control-input" id="customCheck">
                            <label class="custom-control-label" for="customCheck">Lembrar de mim</label>
                          </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-user btn-block">
                          Entrar
                        </button>

                        <hr>
                        <a href="#" class="btn btn-google btn-user btn-block">
                          <i class="fab fa-google fa-fw"></i> Login com Google
                        </a>
                        <a href="#" class="btn btn-facebook btn-user btn-block">
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
  </div>
</template>

<style scoped>
/* Estilos específicos para este componente */
.img-fluid {}

/* Se precisar sobrescrever algum estilo do template */
.card-body {}
</style>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

export default {
  setup() {
    const email = ref('');
    const senha = ref('');
    const router = useRouter();
    const loading = ref(false);
    const errorMessage = ref('');
    localStorage.clear();

    const handleLogin = async () => {
      errorMessage.value = '';
      loading.value = true;
      try {

        if (!email.value || !senha.value) {
          alert('Preencha os campos');
          return;
        }

        // Chamada à API para buscar usuários
        const response = await api.get('/usuarios');

        // Verifica se encontrou um usuário com o email e senha fornecidos
        const usuario = response.data.find((u: any) =>
          u.email === email.value && u.senha === senha.value
        );

        if (usuario) {
          // Armazena o usuário no localStorage (remova a senha por segurança)
          const usuarioParaArmazenar = {
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
            perfilAcesso: usuario.perfilAcesso
          };

          localStorage.setItem('usuario', JSON.stringify(usuarioParaArmazenar));

          // Redireciona para o dashboard
          router.push('/dashboard');
        } else {
          alert('Credenciais invalidas');
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert("Erro no servidor!");
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      senha,
      loading,
      errorMessage,
      handleLogin
    };
  }
}
</script>

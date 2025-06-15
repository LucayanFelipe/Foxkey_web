<template>
    <div class="bg-gradient-primary">
 
        <div class="container">
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->

                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-7">
                        <div class="p-5">
                        
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Crie sua conta!</h1>
                            </div>
                            <form class="user" @submit.prevent="register">
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                            placeholder="Nome" v-model="nome" >
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                                            placeholder="Sobrenome"  v-model="sobrenome">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email"  v-model="email">
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Senha" v-model="senha">
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repita a senha" v-model="repetirSenha">
                                    </div>
                                </div>
                              <button type="submit" class="btn btn-primary btn-user btn-block">
                                  Criar conta
                              </button>
                                <hr>
                                <a href="index.html" class="btn btn-google btn-user btn-block">
                                    <i class="fab fa-google fa-fw"></i> Cadastrar com Google
                                </a>
                                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                    <i class="fab fa-facebook-f fa-fw"></i> Cadastrar com Facebook
                                </a>
                            </form>
                            <hr>
                            <div class="text-center">
                <RouterLink class="small" to="/forgot-password">Esqueceu a senha?</RouterLink>
              </div>
              <div class="text-center">
                <RouterLink class="small" to="/">Já possui uma conta? Login!</RouterLink>
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

import { defineComponent, ref } from 'vue'
import axios from 'axios'


export default defineComponent({
  setup() {
    const nome = ref('')
    const sobrenome = ref('')
    const email = ref('')
    const senha = ref('')
    const repetirSenha = ref('')

    
    const register = async () => {
      if (senha.value !== repetirSenha.value) {
        alert('As senhas não coincidem.')
        return
      }
      if (!nome.value.trim()) {
        alert('Informe o nome.')
        return
      }

      if (!sobrenome.value.trim()) {
        alert('Informe o sobrenome.')
        return
      }

      if (!email.value.trim()) {
        alert('Informe o e-mail.')
        return
      }

      if (!senha.value.trim()) {
        alert('Informe a senha.')
        return
      }

      if (!repetirSenha.value.trim()) {
        alert('Confirme a senha.')
        return
      }

      if (senha.value !== repetirSenha.value) {
        alert('As senhas não coincidem.')
        return
      }

      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          nome: `${nome.value} ${sobrenome.value}`,
          email: email.value,
          senha: senha.value,
        })

        alert('Usuário registrado com sucesso!')
        // redirecionar ou limpar campos
      }  catch (err: any) {
            const mensagemErro =
            err.response?.data?.mensagem ||       // erro customizado do back
            err.response?.data?.erro ||           // erro genérico do back
            err.message ||                        // erro de rede
            'Erro desconhecido ao registrar.'

            alert('Erro ao registrar: ' + mensagemErro)
        }
    }

    return {
      nome,
      sobrenome,
      email,
      senha,
      repetirSenha,
      register,
    }
  }
})
</script>


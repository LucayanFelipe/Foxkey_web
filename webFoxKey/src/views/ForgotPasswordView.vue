<template>
    <div class="bg-gradient-primary">
        <div class="container">

            <!-- Outer Row -->
            <div class="row justify-content-center">

                <div class="col-xl-10 col-lg-12 col-md-9">

                    <div class="card o-hidden border-0 shadow-lg" style="margin-bottom:6em; margin-top: 5.1em;">
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-2">Esqueceu sua senha?</h1>
                                            <p class="mb-4">Nós entendemos, essas coisas acontecem. Insira seu e-mail
                                                e nós enviaremos um link para recuperar sua senha!</p>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Informe seu E-mail..." v-model="email">
                                            </div>
                                            <router-link to="" class="btn btn-primary btn-user btn-block"
                                                @onclick="handleForgetPassword" @click.prevent="handleForgetPassword">
                                                Recuperar senha
                                            </router-link>
                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            <router-link to="/register" class="small">Crie sua conta!</router-link>
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

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    name: 'ForgotPasswordView',
    data() {
        return {
            email: ""
        };
    },

    methods: {
        validarEmail(email: string): boolean {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email) {
                alert("O campo de e-mail está vazio.");
                return false;
            }

            if (!regex.test(email)) {
                alert("E-mail inválido. Verifique se está no formato nome@dominio.com");
                return false;
            }

            return true;
        },
        handleForgetPassword() {
            if (this.validarEmail(this.email))
                alert("Verifique sua caixa de entrada");
        }
    }
})
</script>
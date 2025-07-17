<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />

            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Topbar />

                    <div class="container-fluid">
                        <h1 class="h3 mb-4 text-gray-800">Perfil do Usuário</h1>

                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Informações do Usuário</h6>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <label for="nome">Nome</label>
                                        <input type="text" id="nome" class="form-control" v-model="usuario.nome"
                                            disabled />
                                    </div>

                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" class="form-control" v-model="usuario.email"
                                            disabled />
                                    </div>

                                    <div class="form-group">
                                        <label for="perfil">Nível de Acesso</label>
                                        <input type="text" id="perfil" class="form-control"
                                            v-model="usuario.perfilAcesso" disabled />
                                    </div>

                                    <button class="btn btn-danger mt-3" @click.prevent="confirmarExclusao">
                                        Excluir Conta
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; FoxKey 2025</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
    </div>

    <LogoutModal />
</template>

<script>
import LogoutModal from '@/components/LogoutModal.vue'
import Sidebar from '@/components/SideBar.vue'
import Topbar from '@/components/Topbar.vue'
import api from '@/services/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'PerfilUsuario',
    components: { Sidebar, Topbar, LogoutModal },

    setup() {
        const usuario = ref({
            nome: '',
            email: '',
            perfilAcesso: ''
        })

        const router = useRouter()

        onMounted(async () => {
            const usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
            const idUsuario = usuarioLocal?.id_usuario

            if (!idUsuario) {
                alert('ID do usuário não encontrado. Faça login novamente.')
                router.push('/')
                return
            }

            try {
                // Tente carregar dados atualizados da API
                const { data } = await api.get(`/usuarios/${idUsuario}`)
                usuario.value = data
            } catch (err) {
                // Se a API falhar, usa os dados locais
                console.warn('Erro ao carregar dados da API, usando dados locais.')
                usuario.value = usuarioLocal
            }
        })

        const confirmarExclusao = async () => {
            const usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
            const idUsuario = usuarioLocal?.id_usuario

            const confirmacao = confirm('Tem certeza que deseja excluir sua conta? Essa ação é irreversível.')

            if (confirmacao && idUsuario) {
                try {
                    await api.delete(`/usuarios/${idUsuario}`)
                    alert('Conta excluída com sucesso.')
                    localStorage.clear()
                    router.push('/')
                } catch (error) {
                    alert('Erro ao excluir a conta.')
                }
            }
        }

        return { usuario, confirmarExclusao }
    }
}
</script>

<style scoped>
label {
    font-weight: bold;
}
</style>

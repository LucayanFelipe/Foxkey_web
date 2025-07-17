<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Topbar />

                    <div class="container-fluid">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                                <h6 class="m-0 font-weight-bold text-primary">Consultar Fornecedores</h6>
                                <div>
                                    <button class="btn btn-outline-primary me-2"
                                        :class="{ active: tipoFornecedor === 'PF' }"
                                        @click="alternarTipoFornecedor('PF')">
                                        Pessoa Física
                                    </button>
                                    <button class="btn btn-outline-success" :class="{ active: tipoFornecedor === 'PJ' }"
                                        @click="alternarTipoFornecedor('PJ')">
                                        Pessoa Jurídica
                                    </button>
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="table-responsive">
                                    <!-- TABELA PF -->
                                    <table v-if="tipoFornecedor === 'PF'" :key="dataTableKey"
                                        class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Sobrenome</th>
                                                <th>CPF</th>
                                                <th>RG</th>
                                                <th>Sexo</th>
                                                <th>Data Nascimento</th>
                                                <th>Cidade</th>
                                                <th>Email</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(fornecedor, index) in fornecedores" :key="index">
                                                <td>{{ fornecedor.nome }}</td>
                                                <td>{{ fornecedor.sobrenome }}</td>
                                                <td>{{ fornecedor.cpf }}</td>
                                                <td>{{ fornecedor.rg }}</td>
                                                <td>{{ fornecedor.sexo }}</td>
                                                <td>{{ fornecedor.data_nascimento?.split('T')[0] }}</td>
                                                <td>{{ fornecedor.enderecoContato?.cidade }}</td>
                                                <td>{{ fornecedor.enderecoContato?.email }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-primary me-2"
                                                        @click="editarFornecedor(fornecedor)">Editar</button>
                                                    <button class="btn btn-sm btn-danger"
                                                        @click="excluirFornecedor(fornecedor.id_fornecedor_pf)">Excluir</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <!-- TABELA PJ -->
                                    <table v-else :key="dataTableKey" class="table table-bordered" id="dataTable"
                                        width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Nome Fantasia</th>
                                                <th>Razão Social</th>
                                                <th>CNPJ</th>
                                                <th>Inscrição Municipal</th>
                                                <th>Data Abertura</th>
                                                <th>Representante</th>
                                                <th>Cidade</th>
                                                <th>Email</th>
                                                <th>Celular</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(fornecedor, index) in fornecedores" :key="index">
                                                <td>{{ fornecedor.nome_fantasia }}</td>
                                                <td>{{ fornecedor.razao_social }}</td>
                                                <td>{{ fornecedor.cnpj }}</td>
                                                <td>{{ fornecedor.inscricao_municipal }}</td>
                                                <td>{{ fornecedor.data_abertura?.split('T')[0] }}</td>
                                                <td>{{ fornecedor.representante }}</td>
                                                <td>{{ fornecedor.enderecoContato?.cidade }}</td>
                                                <td>{{ fornecedor.enderecoContato?.email }}</td>
                                                <td>{{ fornecedor.enderecoContato?.celular }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-primary me-2"
                                                        @click="editarFornecedor(fornecedor)">Editar</button>
                                                    <button class="btn btn-sm btn-danger"
                                                        @click="excluirFornecedor(fornecedor.id_fornecedor_pj)">Excluir</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; FoxKey {{ currentYear }}</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <LogoutModal />

        <!-- MODAIS -->
        <EditarFornecedorPfModal v-if="modalVisivel && tipoFornecedor === 'PF'"
            :fornecedorOriginal="fornecedorSelecionado" @atualizado="fetchFornecedores" @fechado="fecharModal" />

        <EditarFornecedorPjModal v-if="modalVisivel && tipoFornecedor === 'PJ'"
            :fornecedorOriginal="fornecedorSelecionado" @atualizado="fetchFornecedores" @fechado="fecharModal" />
    </div>
</template>

<script>
import Sidebar from '../components/SideBar.vue';
import Topbar from '../components/Topbar.vue';
import LogoutModal from '../components/LogoutModal.vue';
import EditarFornecedorPfModal from '../components/EditarFornecedorPfModal.vue';
import EditarFornecedorPjModal from '../components/EditarFornecedorPjModal.vue';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

export default {
    name: 'ConsultaFornecedores',
    components: {
        Sidebar,
        Topbar,
        LogoutModal,
        EditarFornecedorPfModal,
        EditarFornecedorPjModal
    },
    data() {
        return {
            currentYear: new Date().getFullYear(),
            fornecedores: [],
            dataTable: null,
            fornecedorSelecionado: null,
            tipoFornecedor: 'PF',
            modalVisivel: false,
            dataTableKey: 0,
        };
    },
    mounted() {
        this.fetchFornecedores();
    },
    beforeUnmount() {
        if (this.dataTable) this.dataTable.destroy();
    },
    watch: {
        tipoFornecedor() {
            this.modalVisivel = false;
            this.fornecedorSelecionado = null;
        }
    },
    methods: {
        alternarTipoFornecedor(tipo) {
            if (this.modalVisivel) this.fecharModal();
            if (this.dataTable) {
                this.dataTable.clear().destroy();
                this.dataTable = null;
            }
            this.tipoFornecedor = tipo;
            this.$nextTick(() => this.fetchFornecedores());
        },
        async fetchFornecedores() {
            try {
                const rota = this.tipoFornecedor === 'PF' ? 'fornecedorespf' : 'fornecedores-pj';
                const response = await fetch(`http://localhost:5247/${rota}`);
                const data = await response.json();
                this.fornecedores = data;
                this.dataTableKey++;
                this.reconstruirTabela();
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error);
            }
        },
        reconstruirTabela() {
            if (this.dataTable) {
                this.dataTable.clear().destroy();
                this.dataTable = null;
            }
            this.$nextTick(() => {
                const table = $('#dataTable');
                if (table.length) {
                    this.dataTable = table.DataTable({
                        destroy: true,
                        responsive: true,
                        language: {
                            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json"
                        },
                        dom: '<"top"lf>rt<"bottom"ip>',
                        lengthMenu: [5, 10, 25, 50, 100],
                        pageLength: 10,
                        order: [[0, 'asc']]
                    });
                }
            });
        },
        editarFornecedor(fornecedor) {
            if (this.modalVisivel) {
                this.modalVisivel = false;
                this.fornecedorSelecionado = null;
                this.fecharModal();
                this.$nextTick(() => {
                    this.fornecedorSelecionado = fornecedor;
                    this.modalVisivel = true;
                });
            } else {
                this.fornecedorSelecionado = fornecedor;
                this.modalVisivel = true;
            }
        },
        fecharModal() {
            this.modalVisivel = false;
            this.fornecedorSelecionado = null;
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        },
        async excluirFornecedor(id) {
            const confirmar = confirm('Deseja realmente excluir este fornecedor?');
            if (!confirmar) return;
            try {
                const rota = this.tipoFornecedor === 'PF' ? 'fornecedorespf' : 'fornecedores-pj';
                const response = await fetch(`http://localhost:5247/${rota}/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Fornecedor excluído com sucesso!');
                    this.fetchFornecedores();
                } else {
                    alert('Erro ao excluir fornecedor.');
                }
            } catch (error) {
                console.error('Erro ao excluir fornecedor:', error);
                alert('Erro ao excluir fornecedor.');
            }
        }
    }
};
</script>


<style scoped>
/* Estilo geral da tabela */
#dataTable {
    border-collapse: separate;
    border-spacing: 0;
    width: 100% !important;
}

/* Cabeçalho */
#dataTable thead th {
    background-color: #8400ac;
    color: white;
    font-weight: 700;
    padding: 13px 15px;
    border: none;
}

/* Centraliza todos os cabeçalhos */
#dataTable thead th {
    text-align: center !important;
    vertical-align: middle !important;
}

/* Centraliza o conteúdo das células */
#dataTable tbody td {
    text-align: center !important;
    vertical-align: middle !important;
}

/* Ajuste para a coluna de ações se precisar de alinhamento diferente */
#dataTable tbody td:last-child {
    text-align: center !important;
}


/* Linhas da tabela */
#dataTable tbody tr {
    transition: all 0.5s ease;
}

#dataTable tbody tr:hover {
    background-color: #f8f9fc;
}

/* Células */
#dataTable tbody td {
    padding: 12px 15px;
    border-bottom: 1px solid #e3e6f0;
    vertical-align: middle;
}

/* Paginação */
.dataTables_wrapper .dataTables_paginate .paginate_button {
    border-radius: 4px !important;
    margin: 0 2px !important;
    transition: all 0.3s ease !important;
}

.dataTables_wrapper .dataTables_paginate .paginate_button.current {
    background: #4e73df !important;
    color: white !important;
    border: 1px solid #4e73df !important;
}

.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
    background: #2e59d9 !important;
    color: white !important;
    border: 1px solid #2e59d9 !important;
}

/* Campo de busca */
.dataTables_wrapper .dataTables_filter input {
    border: 1px solid #d1d3e2 !important;
    border-radius: 4px !important;
    padding: 5px 10px !important;
    margin-left: 5px !important;
}

/* Dropdown de itens por página */
.dataTables_wrapper .dataTables_length select {
    border: 1px solid #d1d3e2 !important;
    border-radius: 4px !important;
    padding: 4px 8px !important;
    margin: 0 5px !important;
}

/* Botões de ação */
.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25;
    border-radius: 0.4rem;
}

/* Estilo para os ícones de ordenação */
table.dataTable thead .sorting,
table.dataTable thead .sorting_asc,
table.dataTable thead .sorting_desc {
    position: relative;
    padding-right: 30px !important;
    /* Espaço para o ícone */
}

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Font Awesome 5 Free';
    /* Se estiver usando FontAwesome */
    font-weight: 900;
    opacity: 0.5;
}

table.dataTable thead .sorting:after {
    content: "⇅";
    /* Ícone neutro */
    opacity: 0.2;
}

table.dataTable thead .sorting_asc:after {
    content: "↑";
    /* Seta para cima */
    opacity: 1;
    color: #4e73df;
}

table.dataTable thead .sorting_desc:after {
    content: "↓";
    /* Seta para baixo */
    opacity: 1;
    color: #4e73df;
}

/* Se estiver usando FontAwesome */
table.dataTable thead .sorting:after {
    content: "\f0dc";
    /* Ícone de ordenação neutro */
}

table.dataTable thead .sorting_asc:after {
    content: "\f0de";
    /* Seta para cima */
}

table.dataTable thead .sorting_desc:after {
    content: "\f0dd";
    /* Seta para baixo */
}

/* Estilo para os ícones de ordenação */
table.dataTable thead .sorting,
table.dataTable thead .sorting_asc,
table.dataTable thead .sorting_desc {
    position: relative;
    padding-right: 30px !important;
    /* Espaço para o ícone */
}

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Font Awesome 5 Free';
    /* Se estiver usando FontAwesome */
    font-weight: 900;
    opacity: 0.5;
}

table.dataTable thead .sorting:after {
    content: "⇅";
    /* Ícone neutro */
    opacity: 0.2;
}

table.dataTable thead .sorting_asc:after {
    content: "↑";
    /* Seta para cima */
    opacity: 1;
    color: #4e73df;
}

table.dataTable thead .sorting_desc:after {
    content: "↓";
    /* Seta para baixo */
    opacity: 1;
    color: #4e73df;
}

/* Se estiver usando FontAwesome */
table.dataTable thead .sorting:after {
    content: "\f0dc";
    /* Ícone de ordenação neutro */
}

table.dataTable thead .sorting_asc:after {
    content: "\f0de";
    /* Seta para cima */
}

table.dataTable thead .sorting_desc:after {
    content: "\f0dd";
    /* Seta para baixo */
}
</style>
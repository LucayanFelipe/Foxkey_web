<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Topbar />

                    <div class="container-fluid">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Consultar Funcionários</h6>
                            </div>

                            <div class="card-body">
                                <div class="table-responsive">
                                    <table :key="dataTableKey" class="table table-bordered" id="dataTable" width="100%"
                                        cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Sobrenome</th>
                                                <th>CPF</th>
                                                <th>RG</th>
                                                <th>Sexo</th>
                                                <th>Data Nascimento</th>
                                                <th>Cargo</th>
                                                <th>Email</th>
                                                <th>Celular</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(func, index) in funcionarios" :key="index">
                                                <td>{{ func.nome }}</td>
                                                <td>{{ func.sobrenome }}</td>
                                                <td>{{ func.cpf }}</td>
                                                <td>{{ func.rg }}</td>
                                                <td>{{ func.sexo }}</td>
                                                <td>{{ formatarData(func.data_nascimento) }}</td>
                                                <td>{{ func.cargo }}</td>
                                                <td>{{ func.enderecoContato?.email }}</td>
                                                <td>{{ func.enderecoContato?.celular }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-primary me-2"
                                                        @click="editarFuncionario(func)">Editar</button>
                                                    <button class="btn btn-sm btn-danger"
                                                        @click="excluirFuncionario(func.id_funcionario)">Excluir</button>
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

        <EditarFuncionarioModal v-if="modalVisivel" :funcionarioOriginal="funcionarioSelecionado"
            @atualizado="fetchFuncionarios" @fechado="fecharModal" />
    </div>
</template>

<script>
import Sidebar from '../components/SideBar.vue';
import Topbar from '../components/Topbar.vue';
import LogoutModal from '../components/LogoutModal.vue';
import EditarFuncionarioModal from '../components/EditarFuncionarioModal.vue';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

export default {
    name: 'ConsultaFuncionarios',
    components: {
        Sidebar,
        Topbar,
        LogoutModal,
        EditarFuncionarioModal
    },
    data() {
        return {
            currentYear: new Date().getFullYear(),
            funcionarios: [],
            dataTable: null,
            funcionarioSelecionado: null,
            modalVisivel: false,
            dataTableKey: 0
        };
    },
    mounted() {
        this.fetchFuncionarios();
    },
    beforeUnmount() {
        if (this.dataTable) {
            this.dataTable.destroy();
        }
    },
    methods: {
        async fetchFuncionarios() {
            try {
                const response = await fetch('http://localhost:5247/funcionarios');
                const data = await response.json();
                this.funcionarios = data;
                this.dataTableKey++;
                this.reconstruirTabela();
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
            }
        },
        formatarData(data) {
            if (!data) return '';
            return new Date(data).toLocaleDateString('pt-BR');
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
        editarFuncionario(func) {
            this.modalVisivel = false;
            this.funcionarioSelecionado = null;
            this.fecharModal();

            this.$nextTick(() => {
                this.funcionarioSelecionado = func;
                this.modalVisivel = true;
            });
        },
        fecharModal() {
            this.modalVisivel = false;
            this.funcionarioSelecionado = null;

            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();

            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        },
        async excluirFuncionario(id) {
            if (!confirm('Tem certeza que deseja excluir este funcionário?')) return;

            try {
                const response = await fetch(`http://localhost:5247/funcionarios/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Funcionário excluído com sucesso!');
                    this.fetchFuncionarios();
                } else {
                    alert('Erro ao excluir funcionário.');
                }
            } catch (error) {
                console.error('Erro ao excluir funcionário:', error);
                alert('Erro ao excluir funcionário.');
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
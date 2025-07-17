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
                                <h6 class="m-0 font-weight-bold text-primary">Consultar Produtos</h6>
                            </div>

                            <div class="card-body">
                                <div class="table-responsive">
                                    <table :key="dataTableKey" class="table table-bordered" id="dataTable" width="100%"
                                        cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Descrição</th>
                                                <th>Código de Barras</th>
                                                <th>Unidade</th>
                                                <th>Preço Custo</th>
                                                <th>Preço Venda</th>
                                                <th>Ativo</th>
                                                <th>Categoria</th>
                                                <th>Fornecedor</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(produto, index) in produtos" :key="index">
                                                <td>{{ produto.nome }}</td>
                                                <td>{{ produto.descricao }}</td>
                                                <td>{{ produto.codigo_barra }}</td>
                                                <td>{{ produto.unidade_medida }}</td>
                                                <td>R$ {{ produto.preco_custo }}</td>
                                                <td>R$ {{ produto.preco_venda }}</td>
                                                <td>{{ produto.ativo ? 'Sim' : 'Não' }}</td>
                                                <td>{{ produto.categoria?.nome }}</td>
                                                <td>{{ produto.fornecedorPf?.nome || produto.fornecedorPj?.razao_social
                                                }}
                                                </td>
                                                <td>
                                                    <button class="btn btn-sm btn-primary me-2"
                                                        @click="editarProduto(produto)">Editar</button>
                                                    <button class="btn btn-sm btn-danger"
                                                        @click="excluirProduto(produto.id_produto)">Excluir</button>
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

        <EditarProdutoModal v-if="modalVisivel" :produtoOriginal="produtoSelecionado" @atualizado="fetchProdutos"
            @fechado="fecharModal" />
    </div>
</template>

<script>
import Sidebar from '../components/SideBar.vue';
import Topbar from '../components/Topbar.vue';
import LogoutModal from '../components/LogoutModal.vue';
import EditarProdutoModal from '../components/EditarProdutoModal.vue';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

export default {
    name: 'ConsultaProdutos',
    components: {
        Sidebar,
        Topbar,
        LogoutModal,
        EditarProdutoModal
    },
    data() {
        return {
            currentYear: new Date().getFullYear(),
            produtos: [],
            dataTable: null,
            produtoSelecionado: null,
            modalVisivel: false,
            dataTableKey: 0
        };
    },
    mounted() {
        this.fetchProdutos();
    },
    beforeUnmount() {
        if (this.dataTable) {
            this.dataTable.destroy();
        }
    },
    methods: {
        async fetchProdutos() {
            try {
                const response = await fetch('http://localhost:5247/produtos');
                const data = await response.json();
                this.produtos = data;
                this.dataTableKey++;
                this.reconstruirTabela();
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
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
        editarProduto(produto) {
            this.modalVisivel = false;
            this.produtoSelecionado = null;
            this.fecharModal();

            this.$nextTick(() => {
                this.produtoSelecionado = produto;
                this.modalVisivel = true;
            });
        },
        fecharModal() {
            this.modalVisivel = false;
            this.produtoSelecionado = null;

            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();

            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        },
        async excluirProduto(id) {
            if (!confirm('Tem certeza que deseja excluir este produto?')) return;

            try {
                const response = await fetch(`http://localhost:5247/produtos/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Produto excluído com sucesso!');
                    this.fetchProdutos();
                } else {
                    alert('Erro ao excluir produto.');
                }
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto.');
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
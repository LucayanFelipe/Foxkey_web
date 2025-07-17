<template>
    <div id="page-top">
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
            <Sidebar />
            <!-- End of Sidebar -->

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">
                <!-- Main Content -->
                <div id="content">
                    <!-- Topbar -->
                    <Topbar />
                    <!-- End of Topbar -->

                    <!-- Begin Page Content -->
                    <div class="container-fluid">
                        <!-- Page Heading -->
                        <h1 class="h3 mb-4 text-gray-800">Cadastro de Produto</h1>

                        <!-- Alert de Erros -->
                        <div v-if="erros.length > 0" class="alert alert-danger">
                            <ul class="mb-0">
                                <li v-for="(erro, index) in erros" :key="index">{{ erro }}</li>
                            </ul>
                        </div>

                        <!-- Formulário de Cadastro -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Informações do Produto</h6>
                            </div>
                            <div class="card-body">
                                <form @submit.prevent="cadastrarProduto">
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <label for="nome" class="form-label">Nome do Produto</label>
                                            <input v-model="produto.nome" type="text" class="form-control" id="nome"
                                                :class="{ 'is-invalid': campoInvalido('nome') }" required>
                                            <div v-if="campoInvalido('nome')" class="invalid-feedback">
                                                Nome do produto é obrigatório
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="codigo_barra" class="form-label">Código de Barras</label>
                                            <input v-model="produto.codigo_barra" type="text" class="form-control"
                                                id="codigo_barra"
                                                :class="{ 'is-invalid': campoInvalido('codigo_barra') }">
                                            <div v-if="campoInvalido('codigo_barra')" class="invalid-feedback">
                                                Código de barras inválido
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <label for="nome_categoria" class="form-label">Categoria</label>
                                            <select v-model="produto.nome_categoria" class="form-control"
                                                id="nome_categoria"
                                                :class="{ 'is-invalid': campoInvalido('nome_categoria') }" required>
                                                <option value="">Selecione uma categoria</option>
                                                <option v-for="categoria in categorias" :key="categoria.nome"
                                                    :value="categoria.nome">
                                                    {{ categoria.nome }}
                                                </option>
                                            </select>
                                            <div v-if="campoInvalido('nome_categoria')" class="invalid-feedback">
                                                Categoria é obrigatória
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="unidade_medida" class="form-label">Unidade de Medida</label>
                                            <select v-model="produto.unidade_medida" class="form-control"
                                                id="unidade_medida"
                                                :class="{ 'is-invalid': campoInvalido('unidade_medida') }" required>
                                                <option value="">Selecione</option>
                                                <option v-for="unidade in unidadesMedida" :key="unidade"
                                                    :value="unidade">
                                                    {{ unidade }}
                                                </option>
                                            </select>
                                            <div v-if="campoInvalido('unidade_medida')" class="invalid-feedback">
                                                Unidade de medida é obrigatória
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <label for="preco_custo" class="form-label">Preço de Custo (R$)</label>
                                            <input v-model="produto.preco_custo" type="number" step="0.01"
                                                class="form-control" id="preco_custo"
                                                :class="{ 'is-invalid': campoInvalido('preco_custo') }" required>
                                            <div v-if="campoInvalido('preco_custo')" class="invalid-feedback">
                                                Preço de custo inválido
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="preco_venda" class="form-label">Preço de Venda (R$)</label>
                                            <input v-model="produto.preco_venda" type="number" step="0.01"
                                                class="form-control" id="preco_venda"
                                                :class="{ 'is-invalid': campoInvalido('preco_venda') }" required>
                                            <div v-if="campoInvalido('preco_venda')" class="invalid-feedback">
                                                Preço de venda inválido
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-12">
                                            <label for="descricao" class="form-label">Descrição</label>
                                            <textarea v-model="produto.descricao" class="form-control" id="descricao"
                                                rows="3"></textarea>
                                        </div>
                                    </div>

                                    <div class="card-header py-3 mt-4">
                                        <h6 class="m-0 font-weight-bold text-primary">Fornecedor</h6>
                                    </div>

                                    <div class="row mb-3 mt-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Tipo de Fornecedor</label>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" v-model="tipoFornecedor"
                                                    id="fornecedorPF" value="PF" @change="limparFornecedor">
                                                <label class="form-check-label" for="fornecedorPF">
                                                    Pessoa Física
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" v-model="tipoFornecedor"
                                                    id="fornecedorPJ" value="PJ" @change="limparFornecedor">
                                                <label class="form-check-label" for="fornecedorPJ">
                                                    Pessoa Jurídica
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label v-if="tipoFornecedor === 'PF'" for="cpf_fornecedor_pf"
                                                class="form-label">Fornecedor PF</label>
                                            <label v-if="tipoFornecedor === 'PJ'" for="cnpj_fornecedor_pj"
                                                class="form-label">Fornecedor PJ</label>

                                            <select v-if="tipoFornecedor === 'PF'" v-model="produto.cpf_fornecedor_pf"
                                                class="form-control" id="cpf_fornecedor_pf"
                                                :class="{ 'is-invalid': campoInvalido('cpf_fornecedor_pf') }">
                                                <option value="">Selecione um fornecedor</option>
                                                <option v-for="fornecedor in fornecedoresPF" :key="fornecedor.cpf"
                                                    :value="fornecedor.cpf">
                                                    {{ fornecedor.nome }} {{ fornecedor.sobrenome }} - {{
                                                        formatarCPF(fornecedor.cpf) }}
                                                </option>
                                            </select>

                                            <select v-if="tipoFornecedor === 'PJ'" v-model="produto.cnpj_fornecedor_pj"
                                                class="form-control" id="cnpj_fornecedor_pj"
                                                :class="{ 'is-invalid': campoInvalido('cnpj_fornecedor_pj') }">
                                                <option value="">Selecione um fornecedor</option>
                                                <option v-for="fornecedor in fornecedoresPJ" :key="fornecedor.cnpj"
                                                    :value="fornecedor.cnpj">
                                                    {{ fornecedor.razao_social }} - {{ formatarCNPJ(fornecedor.cnpj) }}
                                                </option>
                                            </select>

                                            <div v-if="campoInvalido('fornecedor')" class="invalid-feedback d-block">
                                                Selecione um fornecedor
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-check">
                                                <input v-model="produto.ativo" class="form-check-input" type="checkbox"
                                                    id="ativo">
                                                <label class="form-check-label" for="ativo">
                                                    Produto ativo
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-end mt-4">
                                        <button type="button" class="btn btn-secondary mr-2"
                                            @click="limparFormulario">Limpar</button>
                                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- /.container-fluid -->
                </div>
                <!-- End of Main Content -->

                <!-- Footer -->
                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; FoxKey {{ currentYear }}</span>
                        </div>
                    </div>
                </footer>
                <!-- End of Footer -->
            </div>
            <!-- End of Content Wrapper -->
        </div>
        <!-- End of Page Wrapper -->

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
        <!-- Logout Modal-->
        <LogoutModal />
    </div>
</template>

<script>
import Sidebar from '../components/SideBar.vue';
import Topbar from '../components/Topbar.vue';
import LogoutModal from '../components/LogoutModal.vue';

export default {
    name: 'CadastroProduto',
    components: {
        Sidebar,
        Topbar,
        LogoutModal
    },
    data() {
        return {
            produto: {
                codigo_barra: '',
                unidade_medida: '',
                preco_custo: 0,
                preco_venda: 0,
                ativo: true,
                data_cadastro: new Date().toISOString(),
                nome: '',
                descricao: '',
                nome_categoria: '',
                cpf_fornecedor_pf: '',
                cnpj_fornecedor_pj: ''
            },
            tipoFornecedor: 'PF',
            categorias: [],
            fornecedoresPF: [],
            fornecedoresPJ: [],
            unidadesMedida: ['un', 'kg', 'g', 'l', 'ml', 'm', 'cm', 'mm', 'cx', 'dz', 'pc'],
            erros: [],
            camposInvalidos: {},
            currentYear: new Date().getFullYear()
        }
    },
    async created() {
        await this.carregarCategorias();
        await this.carregarFornecedoresPF();
        await this.carregarFornecedoresPJ();
    },
    methods: {
        campoInvalido(campo) {
            return this.camposInvalidos[campo] || false;
        },

        formatarCPF(cpf) {
            if (!cpf) return '';
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        },

        formatarCNPJ(cnpj) {
            if (!cnpj) return '';
            return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        },

        limparFornecedor() {
            this.produto.cpf_fornecedor_pf = '';
            this.produto.cnpj_fornecedor_pj = '';
        },

        async carregarCategorias() {
            try {
                const response = await fetch('http://localhost:5247/categorias', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                this.categorias = await response.json();
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        },

        async carregarFornecedoresPF() {
            try {
                const response = await fetch('http://localhost:5247/fornecedorespf', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                this.fornecedoresPF = await response.json();
            } catch (error) {
                console.error('Erro ao carregar fornecedores PF:', error);
            }
        },

        async carregarFornecedoresPJ() {
            try {
                const response = await fetch('http://localhost:5247/fornecedores-pj', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                this.fornecedoresPJ = await response.json();
            } catch (error) {
                console.error('Erro ao carregar fornecedores PJ:', error);
            }
        },

        validarFormulario() {
            this.erros = [];
            this.camposInvalidos = {};

            // Validações básicas
            if (!this.produto.nome.trim()) {
                this.erros.push('Nome do produto é obrigatório');
                this.camposInvalidos.nome = true;
            }

            if (!this.produto.nome_categoria) {
                this.erros.push('Categoria é obrigatória');
                this.camposInvalidos.nome_categoria = true;
            }

            if (!this.produto.unidade_medida) {
                this.erros.push('Unidade de medida é obrigatória');
                this.camposInvalidos.unidade_medida = true;
            }

            if (isNaN(this.produto.preco_custo) || this.produto.preco_custo <= 0) {
                this.erros.push('Preço de custo inválido');
                this.camposInvalidos.preco_custo = true;
            }

            if (isNaN(this.produto.preco_venda) || this.produto.preco_venda <= 0) {
                this.erros.push('Preço de venda inválido');
                this.camposInvalidos.preco_venda = true;
            }

            // Validação de fornecedor
            if (this.tipoFornecedor === 'PF' && !this.produto.cpf_fornecedor_pf) {
                this.erros.push('Selecione um fornecedor pessoa física');
                this.camposInvalidos.cpf_fornecedor_pf = true;
                this.camposInvalidos.fornecedor = true;
            }

            if (this.tipoFornecedor === 'PJ' && !this.produto.cnpj_fornecedor_pj) {
                this.erros.push('Selecione um fornecedor pessoa jurídica');
                this.camposInvalidos.cnpj_fornecedor_pj = true;
                this.camposInvalidos.fornecedor = true;
            }

            return this.erros.length === 0;
        },

        async cadastrarProduto() {
            try {
                if (!this.validarFormulario()) return;

                // Preparar o payload conforme esperado pela API
                const payload = {
                    codigo_barra: this.produto.codigo_barra,
                    unidade_medida: this.produto.unidade_medida,
                    preco_custo: parseFloat(this.produto.preco_custo),
                    preco_venda: parseFloat(this.produto.preco_venda),
                    ativo: this.produto.ativo,
                    data_cadastro: new Date().toISOString(),
                    nome: this.produto.nome.trim(),
                    descricao: this.produto.descricao.trim(),
                    nome_categoria: this.produto.nome_categoria,
                    cpf_fornecedor_pf: this.tipoFornecedor === 'PF' ? this.produto.cpf_fornecedor_pf.replace(/\D/g, '') : "",
                    cnpj_fornecedor_pj: this.tipoFornecedor === 'PJ' ? this.produto.cnpj_fornecedor_pj.replace(/\D/g, '') : ""
                };

                console.log("Payload sendo enviado:", payload); // Para debug

                const response = await fetch('http://localhost:5247/produtos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(payload)
                });

                const responseData = await response.clone().json().catch(() => null); // Para debug


                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
                }

                this.limparFormulario();
                this.$router.push('/consultaprodutos');
            } catch (error) {
                console.error('Erro ao cadastrar produto:', error);
                this.erros.push('Erro ao cadastrar produto. Por favor, tente novamente.');
            }
        },

        limparFormulario() {
            this.produto = {
                codigo_barra: '',
                unidade_medida: '',
                preco_custo: 0,
                preco_venda: 0,
                ativo: true,
                data_cadastro: new Date().toISOString(),
                nome: '',
                descricao: '',
                nome_categoria: '',
                cpf_fornecedor_pf: '',
                cnpj_fornecedor_pj: ''
            };
            this.tipoFornecedor = 'PF';
            this.erros = [];
            this.camposInvalidos = {};
        }
    }
};
</script>
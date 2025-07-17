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
                        <div class="d-flex justify-content-between align-items-center">
                            <h1 class="h3 mb-4 text-gray-800">
                                {{ tipoFornecedor === 'pf' ? 'Fornecedor Pessoa Fisica' : 'Fornecedor Pessoa Juridica'
                                }}
                            </h1>
                            <div>
                                <button @click="toggleTipoFornecedor" class="btn btn-secondary">
                                    {{ tipoFornecedor === 'pf' ? 'Ir para Pessoa Jurídica' : 'Ir para Pessoa Física' }}
                                </button>
                            </div>
                        </div>

                        <!-- Alert de Erros -->
                        <div v-if="erros.length > 0" class="alert alert-danger">
                            <ul class="mb-0">
                                <li v-for="(erro, index) in erros" :key="index">{{ erro }}</li>
                            </ul>
                        </div>

                        <!-- Formulário de Cadastro -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Informações {{ tipoFornecedor === 'pf' ?
                                    'Pessoais' : 'da Empresa' }}</h6>
                            </div>
                            <div class="card-body">
                                <form @submit.prevent="cadastrarFornecedor">
                                    <!-- Pessoa Física -->
                                    <div v-if="tipoFornecedor === 'pf'">
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="nome" class="form-label">Nome</label>
                                                <input v-model="fornecedorPF.nome" type="text" class="form-control"
                                                    id="nome" :class="{ 'is-invalid': campoInvalido('nome') }" required>
                                                <div v-if="campoInvalido('nome')" class="invalid-feedback">
                                                    Nome é obrigatório
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="sobrenome" class="form-label">Sobrenome</label>
                                                <input v-model="fornecedorPF.sobrenome" type="text" class="form-control"
                                                    id="sobrenome" :class="{ 'is-invalid': campoInvalido('sobrenome') }"
                                                    required>
                                                <div v-if="campoInvalido('sobrenome')" class="invalid-feedback">
                                                    Sobrenome é obrigatório
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <label for="cpf" class="form-label">CPF</label>
                                                <input v-model="fornecedorPF.cpf" type="text" class="form-control"
                                                    id="cpf" v-mask="'###.###.###-##'"
                                                    :class="{ 'is-invalid': campoInvalido('cpf') }" required
                                                    @blur="validarCPF">
                                                <div v-if="campoInvalido('cpf')" class="invalid-feedback">
                                                    CPF inválido
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="rg" class="form-label">RG</label>
                                                <input v-model="fornecedorPF.rg" type="text" class="form-control"
                                                    id="rg" :class="{ 'is-invalid': campoInvalido('rg') }" required>
                                                <div v-if="campoInvalido('rg')" class="invalid-feedback">
                                                    RG é obrigatório
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="orgao_expedidor" class="form-label">Órgão Expedidor</label>
                                                <input v-model="fornecedorPF.orgao_expedidor" type="text"
                                                    class="form-control" id="orgao_expedidor"
                                                    :class="{ 'is-invalid': campoInvalido('orgao_expedidor') }"
                                                    required>
                                                <div v-if="campoInvalido('orgao_expedidor')" class="invalid-feedback">
                                                    Órgão expedidor é obrigatório
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <label for="dataNascimento" class="form-label">Data de
                                                    Nascimento</label>
                                                <input v-model="fornecedorPF.data_nascimento" type="date"
                                                    class="form-control" id="dataNascimento"
                                                    :class="{ 'is-invalid': campoInvalido('data_nascimento') }"
                                                    required>
                                                <div v-if="campoInvalido('data_nascimento')" class="invalid-feedback">
                                                    Data de nascimento é obrigatória
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="sexo" class="form-label">Sexo</label>
                                                <select v-model="fornecedorPF.sexo" class="form-control" id="sexo"
                                                    :class="{ 'is-invalid': campoInvalido('sexo') }" required>
                                                    <option value="">Selecione</option>
                                                    <option value="MASCULINO">Masculino</option>
                                                    <option value="FEMININO">Feminino</option>
                                                    <option value="OUTRO">Outro</option>
                                                </select>
                                                <div v-if="campoInvalido('sexo')" class="invalid-feedback">
                                                    Sexo é obrigatório
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="estado_civil" class="form-label">Estado Civil</label>
                                                <select v-model="fornecedorPF.estado_civil" class="form-control"
                                                    id="estado_civil"
                                                    :class="{ 'is-invalid': campoInvalido('estado_civil') }" required>
                                                    <option value="">Selecione</option>
                                                    <option value="SOLTEIRO">Solteiro(a)</option>
                                                    <option value="CASADO">Casado(a)</option>
                                                    <option value="DIVORCIADO">Divorciado(a)</option>
                                                    <option value="VIUVO">Viúvo(a)</option>
                                                    <option value="SEPARADO">Separado(a)</option>
                                                </select>
                                                <div v-if="campoInvalido('estado_civil')" class="invalid-feedback">
                                                    Estado civil é obrigatório
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="nacionalidade" class="form-label">Nacionalidade</label>
                                                <input v-model="fornecedorPF.nacionalidade" type="text"
                                                    class="form-control" id="nacionalidade"
                                                    :class="{ 'is-invalid': campoInvalido('nacionalidade') }" required>
                                                <div v-if="campoInvalido('nacionalidade')" class="invalid-feedback">
                                                    Nacionalidade é obrigatória
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="raca" class="form-label">Raça/Cor</label>
                                                <select v-model="fornecedorPF.raca" class="form-control" id="raca"
                                                    :class="{ 'is-invalid': campoInvalido('raca') }" required>
                                                    <option value="">Selecione</option>
                                                    <option value="BRANCA">Branca</option>
                                                    <option value="PRETA">Preta</option>
                                                    <option value="PARDA">Parda</option>
                                                    <option value="AMARELA">Amarela</option>
                                                    <option value="INDIGENA">Indígena</option>
                                                </select>
                                                <div v-if="campoInvalido('raca')" class="invalid-feedback">
                                                    Raça/Cor é obrigatória
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Pessoa Jurídica -->
                                    <div v-else>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="razao_social" class="form-label">Razão Social</label>
                                                <input v-model="fornecedorPJ.razao_social" type="text"
                                                    class="form-control" id="razao_social"
                                                    :class="{ 'is-invalid': campoInvalido('razao_social') }" required>
                                                <div v-if="campoInvalido('razao_social')" class="invalid-feedback">
                                                    Razão Social é obrigatória
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="nome_fantasia" class="form-label">Nome Fantasia</label>
                                                <input v-model="fornecedorPJ.nome_fantasia" type="text"
                                                    class="form-control" id="nome_fantasia"
                                                    :class="{ 'is-invalid': campoInvalido('nome_fantasia') }" required>
                                                <div v-if="campoInvalido('nome_fantasia')" class="invalid-feedback">
                                                    Nome Fantasia é obrigatório
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="cnpj" class="form-label">CNPJ</label>
                                                <input v-model="fornecedorPJ.cnpj" type="text" class="form-control"
                                                    id="cnpj" v-mask="'##.###.###/####-##'"
                                                    :class="{ 'is-invalid': campoInvalido('cnpj') }" required
                                                    @blur="validarCNPJ">
                                                <div v-if="campoInvalido('cnpj')" class="invalid-feedback">
                                                    CNPJ inválido
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inscricao_municipal" class="form-label">Inscrição
                                                    Municipal</label>
                                                <input v-model="fornecedorPJ.inscricao_municipal" type="text"
                                                    class="form-control" id="inscricao_municipal"
                                                    :class="{ 'is-invalid': campoInvalido('inscricao_municipal') }">
                                                <div v-if="campoInvalido('inscricao_municipal')"
                                                    class="invalid-feedback">
                                                    Inscrição Municipal inválida
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="data_abertura" class="form-label">Data de Abertura</label>
                                                <input v-model="fornecedorPJ.data_abertura" type="date"
                                                    class="form-control" id="data_abertura"
                                                    :class="{ 'is-invalid': campoInvalido('data_abertura') }" required>
                                                <div v-if="campoInvalido('data_abertura')" class="invalid-feedback">
                                                    Data de abertura é obrigatória
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="representante" class="form-label">Representante</label>
                                                <input v-model="fornecedorPJ.representante" type="text"
                                                    class="form-control" id="representante"
                                                    :class="{ 'is-invalid': campoInvalido('representante') }" required>
                                                <div v-if="campoInvalido('representante')" class="invalid-feedback">
                                                    Representante é obrigatório
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card-header py-3 mt-4">
                                        <h6 class="m-0 font-weight-bold text-primary">Informações de Contato</h6>
                                    </div>

                                    <div class="row mb-3 mt-3">
                                        <div class="col-md-6">
                                            <label for="email" class="form-label">Email</label>
                                            <input v-model="enderecoContato.email" type="email" class="form-control"
                                                id="email" :class="{ 'is-invalid': campoInvalido('email') }">
                                            <div v-if="campoInvalido('email')" class="invalid-feedback">
                                                Email inválido
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="celular" class="form-label">Celular</label>
                                            <input v-model="enderecoContato.telefone" type="tel" class="form-control"
                                                id="celular" v-mask="'(##) #####-####'"
                                                :class="{ 'is-invalid': campoInvalido('telefone') }">
                                            <div v-if="campoInvalido('telefone')" class="invalid-feedback">
                                                Telefone inválido
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <label for="cidade" class="form-label">Cidade</label>
                                            <input v-model="enderecoContato.cidade" type="text" class="form-control"
                                                id="cidade" :class="{ 'is-invalid': campoInvalido('cidade') }">
                                            <div v-if="campoInvalido('cidade')" class="invalid-feedback">
                                                Cidade é obrigatória
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="estado" class="form-label">Estado</label>
                                            <input v-model="enderecoContato.estado" type="text" class="form-control"
                                                id="estado" maxlength="2"
                                                :class="{ 'is-invalid': campoInvalido('estado') }">
                                            <div v-if="campoInvalido('estado')" class="invalid-feedback">
                                                Estado deve ter 2 letras
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-8">
                                            <label for="logradouro" class="form-label">Logradouro</label>
                                            <input v-model="enderecoContato.logradouro" type="text" class="form-control"
                                                id="logradouro" :class="{ 'is-invalid': campoInvalido('logradouro') }">
                                            <div v-if="campoInvalido('logradouro')" class="invalid-feedback">
                                                Logradouro é obrigatório
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="numero" class="form-label">Número</label>
                                            <input v-model="enderecoContato.numero" type="text" class="form-control"
                                                id="numero" :class="{ 'is-invalid': campoInvalido('numero') }">
                                            <div v-if="campoInvalido('numero')" class="invalid-feedback">
                                                Número é obrigatório
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-4">
                                            <label for="cep" class="form-label">CEP</label>
                                            <input v-model="enderecoContato.cep" type="text" class="form-control"
                                                id="cep" v-mask="'#####-###'"
                                                :class="{ 'is-invalid': campoInvalido('cep') }">
                                            <div v-if="campoInvalido('cep')" class="invalid-feedback">
                                                CEP inválido
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="bairro" class="form-label">Bairro</label>
                                            <input v-model="enderecoContato.bairro" type="text" class="form-control"
                                                id="bairro">
                                        </div>
                                        <div class="col-md-4">
                                            <label for="complemento" class="form-label">Complemento</label>
                                            <input v-model="enderecoContato.complemento" type="text"
                                                class="form-control" id="complemento">
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
    name: 'CadastroFornecedor',
    components: {
        Sidebar,
        Topbar,
        LogoutModal
    },
    data() {
        return {
            tipoFornecedor: 'pf', // 'pf' ou 'pj'
            fornecedorPF: {
                nome: '',
                sobrenome: '',
                cpf: '',
                data_nascimento: '',
                rg: '',
                sexo: '',
                estado_civil: '',
                orgao_expedidor: '',
                nacionalidade: '',
                raca: ''
            },
            fornecedorPJ: {
                nome_fantasia: '',
                razao_social: '',
                inscricao_municipal: '',
                cnpj: '',
                data_abertura: '',
                representante: ''
            },
            enderecoContato: {
                logradouro: '',
                numero: '',
                bairro: '',
                complemento: '',
                referencia: '',
                cep: '',
                estado: '',
                cidade: '',
                email: '',
                telefone: ''
            },
            erros: [],
            camposInvalidos: {},
            currentYear: new Date().getFullYear()
        }
    },
    methods: {
        toggleTipoFornecedor() {
            this.tipoFornecedor = this.tipoFornecedor === 'pf' ? 'pj' : 'pf';
            this.limparFormulario();
        },

        campoInvalido(campo) {
            return this.camposInvalidos[campo] || false;
        },

        validarCPF() {
            const cpf = this.fornecedorPF.cpf.replace(/\D/g, '');
            const valido = cpf.length === 11;
            this.camposInvalidos = {
                ...this.camposInvalidos,
                cpf: !valido
            };
            return valido;
        },

        validarCNPJ() {
            const cnpj = this.fornecedorPJ.cnpj.replace(/\D/g, '');
            const valido = cnpj.length === 14;
            this.camposInvalidos = {
                ...this.camposInvalidos,
                cnpj: !valido
            };
            return valido;
        },

        validarFormulario() {
            this.erros = [];
            this.camposInvalidos = {};

            if (this.tipoFornecedor === 'pf') {
                // Validações Pessoa Física
                if (!this.fornecedorPF.nome.trim()) {
                    this.erros.push('Nome é obrigatório');
                    this.camposInvalidos.nome = true;
                }

                if (!this.fornecedorPF.sobrenome.trim()) {
                    this.erros.push('Sobrenome é obrigatório');
                    this.camposInvalidos.sobrenome = true;
                }

                if (!this.fornecedorPF.cpf || !this.validarCPF()) {
                    this.erros.push('CPF inválido');
                    this.camposInvalidos.cpf = true;
                }

                if (!this.fornecedorPF.data_nascimento) {
                    this.erros.push('Data de nascimento é obrigatória');
                    this.camposInvalidos.data_nascimento = true;
                }

                if (!this.fornecedorPF.rg.trim()) {
                    this.erros.push('RG é obrigatório');
                    this.camposInvalidos.rg = true;
                }

                if (!this.fornecedorPF.sexo) {
                    this.erros.push('Sexo é obrigatório');
                    this.camposInvalidos.sexo = true;
                }

                if (!this.fornecedorPF.estado_civil) {
                    this.erros.push('Estado civil é obrigatório');
                    this.camposInvalidos.estado_civil = true;
                }

                if (!this.fornecedorPF.orgao_expedidor.trim()) {
                    this.erros.push('Órgão expedidor é obrigatório');
                    this.camposInvalidos.orgao_expedidor = true;
                }

                if (!this.fornecedorPF.nacionalidade.trim()) {
                    this.erros.push('Nacionalidade é obrigatória');
                    this.camposInvalidos.nacionalidade = true;
                }

                if (!this.fornecedorPF.raca) {
                    this.erros.push('Raça/Cor é obrigatória');
                    this.camposInvalidos.raca = true;
                }
            } else {
                // Validações Pessoa Jurídica
                if (!this.fornecedorPJ.razao_social.trim()) {
                    this.erros.push('Razão Social é obrigatória');
                    this.camposInvalidos.razao_social = true;
                }

                if (!this.fornecedorPJ.nome_fantasia.trim()) {
                    this.erros.push('Nome Fantasia é obrigatório');
                    this.camposInvalidos.nome_fantasia = true;
                }

                if (!this.fornecedorPJ.cnpj || !this.validarCNPJ()) {
                    this.erros.push('CNPJ inválido');
                    this.camposInvalidos.cnpj = true;
                }

                if (!this.fornecedorPJ.data_abertura) {
                    this.erros.push('Data de abertura é obrigatória');
                    this.camposInvalidos.data_abertura = true;
                }

                if (!this.fornecedorPJ.representante.trim()) {
                    this.erros.push('Representante é obrigatório');
                    this.camposInvalidos.representante = true;
                }
            }

            // Validações comuns de contato
            if (this.enderecoContato.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.enderecoContato.email)) {
                this.erros.push('Email inválido');
                this.camposInvalidos.email = true;
            }

            if (this.enderecoContato.telefone && this.enderecoContato.telefone.replace(/\D/g, '').length < 10) {
                this.erros.push('Telefone inválido');
                this.camposInvalidos.telefone = true;
            }

            if (!this.enderecoContato.estado || this.enderecoContato.estado.length !== 2) {
                this.erros.push('Estado deve ter 2 letras');
                this.camposInvalidos.estado = true;
            }

            if (!this.enderecoContato.cidade.trim()) {
                this.erros.push('Cidade é obrigatória');
                this.camposInvalidos.cidade = true;
            }

            if (!this.enderecoContato.logradouro.trim()) {
                this.erros.push('Logradouro é obrigatório');
                this.camposInvalidos.logradouro = true;
            }

            if (!this.enderecoContato.numero.trim()) {
                this.erros.push('Número é obrigatório');
                this.camposInvalidos.numero = true;
            }

            if (!this.enderecoContato.cep || this.enderecoContato.cep.replace(/\D/g, '').length !== 8) {
                this.erros.push('CEP inválido');
                this.camposInvalidos.cep = true;
            }

            return this.erros.length === 0;
        },

        async cadastrarFornecedor() {
            try {
                if (!this.validarFormulario()) return;

                let payload, endpoint;

                if (this.tipoFornecedor === 'pf') {
                    endpoint = 'fornecedorespf';
                    payload = {
                        nome: this.fornecedorPF.nome.trim(),
                        sobrenome: this.fornecedorPF.sobrenome.trim(),
                        cpf: this.fornecedorPF.cpf.replace(/\D/g, ''),
                        data_nascimento: new Date(this.fornecedorPF.data_nascimento).toISOString(),
                        rg: this.fornecedorPF.rg.replace(/\D/g, ''),
                        sexo: this.fornecedorPF.sexo,
                        estado_civil: this.fornecedorPF.estado_civil,
                        orgao_expedidor: this.fornecedorPF.orgao_expedidor.trim(),
                        nacionalidade: this.fornecedorPF.nacionalidade.trim(),
                        raca: this.fornecedorPF.raca,
                        enderecoContato: {
                            rua: this.enderecoContato.logradouro.trim(),
                            numero: this.enderecoContato.numero.trim(),
                            bairro: this.enderecoContato.bairro?.trim() || '',
                            complemento: this.enderecoContato.complemento?.trim() || '',
                            referencia: this.enderecoContato.referencia?.trim() || '',
                            cep: this.enderecoContato.cep.replace(/\D/g, ''),
                            estado: this.enderecoContato.estado.trim().toUpperCase(),
                            cidade: this.enderecoContato.cidade.trim(),
                            email: this.enderecoContato.email.trim().toLowerCase(),
                            celular: this.enderecoContato.telefone.replace(/\D/g, '')
                        }
                    };
                } else {
                    endpoint = 'fornecedores-pj';
                    payload = {
                        nome_fantasia: this.fornecedorPJ.nome_fantasia.trim(),
                        razao_social: this.fornecedorPJ.razao_social.trim(),
                        inscricao_municipal: this.fornecedorPJ.inscricao_municipal?.trim() || '',
                        cnpj: this.fornecedorPJ.cnpj.replace(/\D/g, ''),
                        data_abertura: new Date(this.fornecedorPJ.data_abertura).toISOString(),
                        representante: this.fornecedorPJ.representante.trim(),
                        enderecoContato: {
                            rua: this.enderecoContato.logradouro.trim(),
                            numero: this.enderecoContato.numero.trim(),
                            bairro: this.enderecoContato.bairro?.trim() || '',
                            complemento: this.enderecoContato.complemento?.trim() || '',
                            referencia: this.enderecoContato.referencia?.trim() || '',
                            cep: this.enderecoContato.cep.replace(/\D/g, ''),
                            estado: this.enderecoContato.estado.trim().toUpperCase(),
                            cidade: this.enderecoContato.cidade.trim(),
                            email: this.enderecoContato.email.trim().toLowerCase(),
                            celular: this.enderecoContato.telefone.replace(/\D/g, '')
                        }
                    };
                }

                const response = await fetch(`http://localhost:5247/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(payload)
                });

                const clone = response.clone();
                console.log('Resposta completa:', await clone.text());

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const errorMsg = this.tipoFornecedor === 'pf'
                        ? "Erro ao cadastrar, verifique se o CPF não consta no banco de dados"
                        : "Erro ao cadastrar, verifique se o CNPJ não consta no banco de dados";
                    alert(errorMsg);
                    throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
                }

                this.limparFormulario();
                this.$router.push('/consultarfornecedores');
            } catch (error) {
                console.error('Erro completo:', error);
                this.erros.push('Erro ao cadastrar fornecedor. Por favor, tente novamente.');
            }
        },

        limparFormulario() {
            if (this.tipoFornecedor === 'pf') {
                this.fornecedorPF = {
                    nome: '',
                    sobrenome: '',
                    cpf: '',
                    data_nascimento: '',
                    rg: '',
                    sexo: '',
                    estado_civil: '',
                    orgao_expedidor: '',
                    nacionalidade: '',
                    raca: ''
                };
            } else {
                this.fornecedorPJ = {
                    nome_fantasia: '',
                    razao_social: '',
                    inscricao_municipal: '',
                    cnpj: '',
                    data_abertura: '',
                    representante: ''
                };
            }

            this.enderecoContato = {
                logradouro: '',
                numero: '',
                bairro: '',
                complemento: '',
                referencia: '',
                cep: '',
                estado: '',
                cidade: '',
                email: '',
                telefone: ''
            };

            this.erros = [];
            this.camposInvalidos = {};
        }
    }
};
</script>
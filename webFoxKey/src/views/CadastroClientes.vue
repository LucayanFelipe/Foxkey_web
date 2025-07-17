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
                                {{ tipoCliente === 'pf' ? 'Cliente Pessoa Fisica' : 'Cliente Pessoa Juridica'
                                }}
                            </h1>
                            <div>
                                <button @click="toggleTipoCliente" class="btn btn-secondary">
                                    {{ tipoCliente === 'pf' ? 'Ir para Pessoa Jurídica' : 'Ir para Pessoa Física' }}
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
                                <h6 class="m-0 font-weight-bold text-primary">Informações {{ tipoCliente === 'pf' ?
                                    'Pessoais' : 'da Empresa' }}</h6>
                            </div>
                            <div class="card-body">
                                <form @submit.prevent="cadastrarCliente">
                                    <!-- Pessoa Física -->
                                    <div v-if="tipoCliente === 'pf'">
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="nome" class="form-label">Nome</label>
                                                <input v-model="clientePF.nome" type="text" class="form-control"
                                                    id="nome" :class="{ 'is-invalid': campoInvalido('nome') }" required>
                                                <div v-if="campoInvalido('nome')" class="invalid-feedback">
                                                    Nome é obrigatório
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="sobrenome" class="form-label">Sobrenome</label>
                                                <input v-model="clientePF.sobrenome" type="text" class="form-control"
                                                    id="sobrenome" :class="{ 'is-invalid': campoInvalido('sobrenome') }"
                                                    required>
                                                <div v-if="campoInvalido('sobrenome')" class="invalid-feedback">
                                                    Sobrenome é obrigatório
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="cpf" class="form-label">CPF</label>
                                                <input v-model="clientePF.cpf" type="text" class="form-control" id="cpf"
                                                    v-mask="'###.###.###-##'"
                                                    :class="{ 'is-invalid': campoInvalido('cpf') }" required
                                                    @blur="validarCPF">
                                                <div v-if="campoInvalido('cpf')" class="invalid-feedback">
                                                    CPF inválido
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="rg" class="form-label">RG</label>
                                                <input v-model="clientePF.rg" type="text" class="form-control" id="rg"
                                                    :class="{ 'is-invalid': campoInvalido('rg') }" required>
                                                <div v-if="campoInvalido('rg')" class="invalid-feedback">
                                                    RG é obrigatório
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="sexo" class="form-label">Sexo</label>
                                                <select v-model="clientePF.sexo" class="form-control" id="sexo"
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
                                            <div class="col-md-6">
                                                <label for="dataNascimento" class="form-label">Data de
                                                    Nascimento</label>
                                                <input v-model="clientePF.data_nascimento" type="date"
                                                    class="form-control" id="dataNascimento"
                                                    :class="{ 'is-invalid': campoInvalido('data_nascimento') }"
                                                    required>
                                                <div v-if="campoInvalido('data_nascimento')" class="invalid-feedback">
                                                    Data de nascimento é obrigatória
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Pessoa Jurídica -->
                                    <div v-else>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="razao_social" class="form-label">Razão Social</label>
                                                <input v-model="clientePJ.razao_social" type="text" class="form-control"
                                                    id="razao_social"
                                                    :class="{ 'is-invalid': campoInvalido('razao_social') }" required>
                                                <div v-if="campoInvalido('razao_social')" class="invalid-feedback">
                                                    Razão Social é obrigatória
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="nome_fantasia" class="form-label">Nome Fantasia</label>
                                                <input v-model="clientePJ.nome_fantasia" type="text"
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
                                                <input v-model="clientePJ.cnpj" type="text" class="form-control"
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
                                                <input v-model="clientePJ.inscricao_municipal" type="text"
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
                                                <input v-model="clientePJ.data_abertura" type="date"
                                                    class="form-control" id="data_abertura"
                                                    :class="{ 'is-invalid': campoInvalido('data_abertura') }" required>
                                                <div v-if="campoInvalido('data_abertura')" class="invalid-feedback">
                                                    Data de abertura é obrigatória
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="representante" class="form-label">Representante</label>
                                                <input v-model="clientePJ.representante" type="text"
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
    name: 'CadastroCliente',
    components: {
        Sidebar,
        Topbar,
        LogoutModal
    },
    data() {
        return {
            tipoCliente: 'pf', // 'pf' ou 'pj'
            clientePF: {
                nome: '',
                sobrenome: '',
                cpf: '',
                rg: '',
                sexo: '',
                data_nascimento: '',
            },
            clientePJ: {
                nome_fantasia: '',
                razao_social: '',
                inscricao_municipal: '',
                cnpj: '',
                data_abertura: '',
                representante: '',
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
        toggleTipoCliente() {
            this.tipoCliente = this.tipoCliente === 'pf' ? 'pj' : 'pf';
            this.limparFormulario();
        },

        campoInvalido(campo) {
            return this.camposInvalidos[campo] || false;
        },

        validarCPF() {
            const cpf = this.clientePF.cpf.replace(/\D/g, '');
            const valido = cpf.length === 11;
            this.camposInvalidos = {
                ...this.camposInvalidos,
                cpf: !valido
            };
            return valido;
        },

        validarCNPJ() {
            const cnpj = this.clientePJ.cnpj.replace(/\D/g, '');
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

            if (this.tipoCliente === 'pf') {
                // Validações Pessoa Física
                if (!this.clientePF.nome.trim()) {
                    this.erros.push('Nome é obrigatório');
                    this.camposInvalidos.nome = true;
                }

                if (!this.clientePF.sobrenome.trim()) {
                    this.erros.push('Sobrenome é obrigatório');
                    this.camposInvalidos.sobrenome = true;
                }

                if (!this.clientePF.cpf || !this.validarCPF()) {
                    this.erros.push('CPF inválido');
                    this.camposInvalidos.cpf = true;
                }

                if (!this.clientePF.rg.trim()) {
                    this.erros.push('RG é obrigatório');
                    this.camposInvalidos.rg = true;
                }

                if (!this.clientePF.sexo) {
                    this.erros.push('Sexo é obrigatório');
                    this.camposInvalidos.sexo = true;
                }

                if (!this.clientePF.data_nascimento) {
                    this.erros.push('Data de nascimento é obrigatória');
                    this.camposInvalidos.data_nascimento = true;
                }
            } else {
                // Validações Pessoa Jurídica
                if (!this.clientePJ.razao_social.trim()) {
                    this.erros.push('Razão Social é obrigatória');
                    this.camposInvalidos.razao_social = true;
                }

                if (!this.clientePJ.nome_fantasia.trim()) {
                    this.erros.push('Nome Fantasia é obrigatório');
                    this.camposInvalidos.nome_fantasia = true;
                }

                if (!this.clientePJ.cnpj || !this.validarCNPJ()) {
                    this.erros.push('CNPJ inválido');
                    this.camposInvalidos.cnpj = true;
                }

                if (!this.clientePJ.data_abertura) {
                    this.erros.push('Data de abertura é obrigatória');
                    this.camposInvalidos.data_abertura = true;
                }

                if (!this.clientePJ.representante.trim()) {
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

        async cadastrarCliente() {
            try {
                if (!this.validarFormulario()) return;

                let payload, endpoint;

                if (this.tipoCliente === 'pf') {
                    endpoint = 'clientepf';
                    payload = {
                        nome: this.clientePF.nome.trim(),
                        sobrenome: this.clientePF.sobrenome.trim(),
                        cpf: this.clientePF.cpf.replace(/\D/g, ''),
                        rg: this.clientePF.rg.replace(/\D/g, ''),
                        sexo: this.clientePF.sexo,
                        data_nascimento: new Date(this.clientePF.data_nascimento).toISOString(),
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
                    endpoint = 'clientepj';
                    payload = {
                        nome_fantasia: this.clientePJ.nome_fantasia.trim(),
                        razao_social: this.clientePJ.razao_social.trim(),
                        inscricao_municipal: this.clientePJ.inscricao_municipal?.trim() || '',
                        cnpj: this.clientePJ.cnpj.replace(/\D/g, ''),
                        data_abertura: new Date(this.clientePJ.data_abertura).toISOString(),
                        representante: this.clientePJ.representante.trim(),
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
                    const errorMsg = this.tipoCliente === 'pf'
                        ? "Erro ao cadastrar, verifique se o CPF não consta no banco de dados"
                        : "Erro ao cadastrar, verifique se o CNPJ não consta no banco de dados";
                    alert(errorMsg);
                    throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
                }

                this.limparFormulario();
                this.$router.push('/consultaclientes');
            } catch (error) {
                console.error('Erro completo:', error);
                this.erros.push('Erro ao cadastrar cliente. Por favor, tente novamente.');
            }
        },

        limparFormulario() {
            if (this.tipoCliente === 'pf') {
                this.clientePF = {
                    nome: '',
                    sobrenome: '',
                    cpf: '',
                    rg: '',
                    sexo: '',
                    data_nascimento: '',
                };
            } else {
                this.clientePJ = {
                    nome_fantasia: '',
                    razao_social: '',
                    inscricao_municipal: '',
                    cnpj: '',
                    data_abertura: '',
                    representante: '',
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
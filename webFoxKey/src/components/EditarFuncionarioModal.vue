<template>
    <div class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <form @submit.prevent="salvarAlteracoes">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Funcionário</h5>
                        <button type="button" class="btn-close" @click="$emit('fechado')"></button>
                    </div>

                    <div class="modal-body">
                        <div class="row">
                            <!-- Dados Pessoais -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Nome</label>
                                <input v-model="funcionario.nome" class="form-control" required />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Sobrenome</label>
                                <input v-model="funcionario.sobrenome" class="form-control" required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">CPF</label>
                                <input v-model="funcionario.cpf" class="form-control" required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">RG</label>
                                <input v-model="funcionario.rg" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Órgão Expedidor</label>
                                <input v-model="funcionario.orgao_expedidor" class="form-control" />
                            </div>

                            <!-- Raça -->
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Raça</label>
                                <select v-model="funcionario.raca" class="form-select" required>
                                    <option disabled value="">Selecione...</option>
                                    <option>BRANCA</option>
                                    <option>PARDA</option>
                                    <option>PRETA</option>
                                    <option>INDÍGENA</option>
                                    <option>AMARELA</option>
                                </select>
                            </div>


                            <!-- Sexo -->
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Sexo</label>
                                <select v-model="funcionario.sexo" class="form-select" required>
                                    <option disabled value="">Selecione...</option>
                                    <option>MASCULINO</option>
                                    <option>FEMININO</option>
                                    <option>OUTRO</option>
                                </select>
                            </div>


                            <div class="col-md-4 mb-3">
                                <label class="form-label">Estado Civil</label>
                                <select v-model="funcionario.estado_civil" class="form-select" required>
                                    <option disabled value="">Selecione...</option>
                                    <option>SOLTEIRO</option>
                                    <option>CASADO</option>
                                    <option>SEPARADO</option>
                                    <option>DIVORCIADO</option>
                                    <option>VIUVO</option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Data de Nascimento</label>
                                <input type="date" v-model="funcionario.data_nascimento" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Cargo</label>
                                <input v-model="funcionario.cargo" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Número CTPS</label>
                                <input v-model="funcionario.numero_ctps" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Número PIS</label>
                                <input v-model="funcionario.numero_pis" class="form-control" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Grau de Instrução</label>
                                <select v-model="funcionario.grau_instrucao" class="form-select" required>
                                    <option disabled value="">Selecione...</option>
                                    <option>ENSINO FUNDAMENTAL</option>
                                    <option>ENSINO MÉDIO</option>
                                    <option>ENSINO SUPERIOR</option>
                                    <option>PÓS-GRADUAÇÃO</option>
                                </select>
                            </div>

                            <!-- Endereço e Contato -->
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Rua</label>
                                <input v-model="funcionario.enderecoContato.rua" class="form-control" />
                            </div>
                            <div class="col-md-2 mb-3">
                                <label class="form-label">Número</label>
                                <input v-model="funcionario.enderecoContato.numero" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Bairro</label>
                                <input v-model="funcionario.enderecoContato.bairro" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Complemento</label>
                                <input v-model="funcionario.enderecoContato.complemento" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Referência</label>
                                <input v-model="funcionario.enderecoContato.referencia" class="form-control" />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">CEP</label>
                                <input v-model="funcionario.enderecoContato.cep" class="form-control" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Cidade</label>
                                <input v-model="funcionario.enderecoContato.cidade" class="form-control" />
                            </div>
                            <div class="col-md-2 mb-3">
                                <label class="form-label">Estado</label>
                                <input v-model="funcionario.enderecoContato.estado" class="form-control" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" v-model="funcionario.enderecoContato.email" class="form-control" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Celular</label>
                                <input v-model="funcionario.enderecoContato.celular" class="form-control" />
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="$emit('fechado')">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditarFuncionarioModal',
    props: {
        funcionarioOriginal: Object
    },
    data() {
        return {
            funcionario: JSON.parse(JSON.stringify(this.funcionarioOriginal)) // cópia profunda para edição segura
        };
    },
    methods: {
        async salvarAlteracoes() {
            try {
                const response = await fetch(`http://localhost:5247/funcionarios/${this.funcionario.id_funcionario}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.funcionario)
                });

                if (response.ok) {
                    alert('Funcionário atualizado com sucesso!');
                    this.$emit('atualizado');
                    this.$emit('fechado');
                } else {
                    alert('Erro ao atualizar funcionário.');
                }
            } catch (error) {
                console.error('Erro ao salvar alterações:', error);
                alert('Erro ao salvar alterações.');
            }
        }
    }
};
</script>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>

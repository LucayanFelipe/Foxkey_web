<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <form @submit.prevent="salvarAlteracoes">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Fornecedor (Pessoa Física)</h5>
                        <button type="button" class="close" @click="$emit('fechado')">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body row">
                        <!-- Dados pessoais -->
                        <div class="col-md-6 mb-3">
                            <label>Nome</label>
                            <input v-model="fornecedor.nome" class="form-control" required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Sobrenome</label>
                            <input v-model="fornecedor.sobrenome" class="form-control" required />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>CPF</label>
                            <input v-model="fornecedor.cpf" class="form-control" required />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>RG</label>
                            <input v-model="fornecedor.rg" class="form-control" />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Órgão Expedidor</label>
                            <input v-model="fornecedor.orgao_expedidor" class="form-control" />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Sexo</label>
                            <select v-model="fornecedor.sexo" class="form-control">
                                <option>MASCULINO</option>
                                <option>FEMININO</option>
                                <option>OUTRO</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Data de Nascimento</label>
                            <input type="date" v-model="fornecedor.data_nascimento" class="form-control" />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Estado Civil</label>
                            <select v-model="fornecedor.estado_civil" class="form-control">
                                <option>SOLTEIRO</option>
                                <option>CASADO</option>
                                <option>SEPARADO</option>
                                <option>DIVORCIADO</option>
                                <option>VIUVO</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Nacionalidade</label>
                            <input v-model="fornecedor.nacionalidade" class="form-control" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Raça</label>
                            <select v-model="fornecedor.raca" class="form-control">
                                <option>BRANCA</option>
                                <option>PARDA</option>
                                <option>PRETA</option>
                                <option>INDÍGENA</option>
                                <option>AMARELA</option>
                            </select>
                        </div>

                        <div class="col-12">
                            <hr />
                        </div>

                        <!-- Contato -->
                        <div class="col-md-4 mb-3">
                            <label>Email</label>
                            <input v-model="fornecedor.enderecoContato.email" class="form-control" />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Celular</label>
                            <input v-model="fornecedor.enderecoContato.celular" class="form-control" />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>CEP</label>
                            <input v-model="fornecedor.enderecoContato.cep" class="form-control" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Rua</label>
                            <input v-model="fornecedor.enderecoContato.rua" class="form-control" />
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Número</label>
                            <input v-model="fornecedor.enderecoContato.numero" class="form-control" />
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Complemento</label>
                            <input v-model="fornecedor.enderecoContato.complemento" class="form-control" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Bairro</label>
                            <input v-model="fornecedor.enderecoContato.bairro" class="form-control" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Referência</label>
                            <input v-model="fornecedor.enderecoContato.referencia" class="form-control" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Estado</label>
                            <input v-model="fornecedor.enderecoContato.estado" class="form-control" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Cidade</label>
                            <input v-model="fornecedor.enderecoContato.cidade" class="form-control" />
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="$emit('fechado')">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: { fornecedorOriginal: Object },
    data() {
        return {
            fornecedor: JSON.parse(JSON.stringify(this.fornecedorOriginal))
        };
    },
    methods: {
        async salvarAlteracoes() {
            try {
                const response = await fetch(`http://localhost:5247/fornecedorespf/${this.fornecedor.id_fornecedor_pf}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.fornecedor)
                });

                if (response.ok) {
                    alert('Fornecedor atualizado com sucesso!');
                    this.$emit('atualizado');
                    this.$emit('fechado');
                } else {
                    alert('Erro ao atualizar fornecedor.');
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao atualizar fornecedor.');
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

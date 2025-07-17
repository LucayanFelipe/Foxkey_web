<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <form @submit.prevent="salvarAlteracoes">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Fornecedor (Pessoa Jurídica)</h5>
                        <button type="button" class="close" @click="$emit('fechado')">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body row">
                        <!-- Dados da empresa -->
                        <div class="col-md-6 mb-3">
                            <label>Nome Fantasia</label>
                            <input v-model="fornecedor.nome_fantasia" class="form-control" required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Razão Social</label>
                            <input v-model="fornecedor.razao_social" class="form-control" required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>CNPJ</label>
                            <input v-model="fornecedor.cnpj" class="form-control" required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Inscrição Municipal</label>
                            <input v-model="fornecedor.inscricao_municipal" class="form-control" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Data de Abertura</label>
                            <input type="date" v-model="fornecedor.data_abertura" class="form-control" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Representante</label>
                            <input v-model="fornecedor.representante" class="form-control" />
                        </div>

                        <div class="col-12">
                            <hr />
                        </div>

                        <!-- Endereço e contato -->
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
                        <button type="submit" class="btn btn-success">Salvar</button>
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
                const response = await fetch(`http://localhost:5247/fornecedores-pj/${this.fornecedor.id_fornecedor_pj}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.fornecedor)
                });

                if (response.ok) {
                    alert('Fornecedor PJ atualizado com sucesso!');
                    this.$emit('atualizado');
                    this.$emit('fechado');
                } else {
                    alert('Erro ao atualizar fornecedor PJ.');
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao atualizar fornecedor PJ.');
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

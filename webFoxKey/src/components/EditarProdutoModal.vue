<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <form @submit.prevent="salvarAlteracoes">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Produto</h5>
                        <button type="button" class="btn-close" @click="$emit('fechado')"></button>
                    </div>

                    <div class="modal-body row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Nome</label>
                            <input v-model="produto.nome" class="form-control" required />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Descrição</label>
                            <input v-model="produto.descricao" class="form-control" />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Código de Barras</label>
                            <input v-model="produto.codigo_barra" class="form-control" />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Unidade de Medida</label>
                            <select v-model="produto.unidade_medida" class="form-select">
                                <option value="un">Unidade</option>
                                <option value="cx">Caixa</option>
                                <option value="kg">Quilo</option>
                                <option value="g">Grama</option>
                                <option value="t">Tonelada</option>
                                <option value="l">Litro</option>
                                <option value="ml">Mililitro</option>
                                <option value="m">Metro</option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Preço de Custo</label>
                            <input type="number" step="0.01" v-model="produto.preco_custo" class="form-control" />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Preço de Venda</label>
                            <input type="number" step="0.01" v-model="produto.preco_venda" class="form-control" />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Categoria</label>
                            <select v-model="produto.nome_categoria" class="form-select" required>
                                <option disabled value="">Selecione uma categoria</option>
                                <option v-for="cat in categorias" :key="cat.id_categoria" :value="cat.nome">
                                    {{ cat.nome }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Fornecedor (CPF ou CNPJ)</label>
                            <input v-model="fornecedor" class="form-control" placeholder="Digite CPF ou CNPJ" />
                        </div>

                        <div class="col-md-6 form-check">
                            <input class="form-check-input" type="checkbox" v-model="produto.ativo" id="ativoCheck" />
                            <label class="form-check-label" for="ativoCheck">Ativo</label>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success">Salvar</button>
                        <button type="button" class="btn btn-secondary" @click="$emit('fechado')">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditarProdutoModal',
    props: {
        produtoOriginal: Object
    },
    data() {
        return {
            produto: { ...this.produtoOriginal },
            fornecedor: this.produtoOriginal?.cpf_fornecedor_pf || this.produtoOriginal?.cnpj_fornecedor_pj || '',
            categorias: []
        };
    },


    async mounted() {
        await this.carregarCategorias();
    },
    methods: {
        async carregarCategorias() {
            try {
                const res = await fetch('http://localhost:5247/categorias');
                const data = await res.json();
                this.categorias = data;
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
                alert('Erro ao carregar categorias.');
            }
        },
        async salvarAlteracoes() {
            try {
                const body = {
                    ...this.produto,
                    cpf_fornecedor_pf: this.fornecedor.length <= 14 ? this.fornecedor.replace(/\D/g, '') : null,
                    cnpj_fornecedor_pj: this.fornecedor.length > 14 ? this.fornecedor.replace(/\D/g, '') : null
                };

                const response = await fetch(`http://localhost:5247/produtos/${this.produto.id_produto}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                if (response.ok) {
                    alert('Produto atualizado com sucesso!');
                    this.$emit('atualizado');
                    this.$emit('fechado');
                } else {
                    alert('Erro ao atualizar produto.');
                }
            } catch (err) {
                console.error('Erro ao salvar alterações:', err);
                alert('Erro interno ao salvar alterações.');
            }
        }
    }
};
</script>

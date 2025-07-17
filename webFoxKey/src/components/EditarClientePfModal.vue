<template>
    <div class="modal fade" id="editarClienteModal" tabindex="-1" aria-labelledby="editarClienteModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editarClienteModalLabel">Editar Cliente</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="salvarEdicao">
                        <div class="row mb-3">
                            <div class="col">
                                <label>Nome</label>
                                <input v-model="cliente.nome" type="text" class="form-control" required>
                            </div>
                            <div class="col">
                                <label>Sobrenome</label>
                                <input v-model="cliente.sobrenome" type="text" class="form-control" required>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col">
                                <label>CPF</label>
                                <input v-model="cliente.cpf" type="text" class="form-control" required>
                            </div>
                            <div class="col">
                                <label>RG</label>
                                <input v-model="cliente.rg" type="text" class="form-control" required>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col">
                                <label>Sexo</label>
                                <select v-model="cliente.sexo" class="form-control" required>
                                    <option value="MASCULINO">Masculino</option>
                                    <option value="FEMININO">Feminino</option>
                                </select>
                            </div>
                            <div class="col">
                                <label>Data de Nascimento</label>
                                <input v-model="cliente.data_nascimento" type="date" class="form-control" required>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col">
                                <label>Email</label>
                                <input v-model="cliente.enderecoContato.email" type="email" class="form-control">
                            </div>
                            <div class="col">
                                <label>Cidade</label>
                                <input v-model="cliente.enderecoContato.cidade" type="text" class="form-control">
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditarClienteModal',
    props: {
        clienteOriginal: Object
    },
    data() {
        return {
            cliente: {},
            modalInstance: null,
            isSaving: false,
        };
    },
    mounted() {
        this.$nextTick(() => {
            const modalEl = document.getElementById('editarClienteModal');
            if (modalEl) {
                this.modalInstance = new bootstrap.Modal(modalEl);

                // Adiciona listener para quando o modal é fechado
                modalEl.addEventListener('hidden.bs.modal', () => {
                    this.$emit('fechado');
                });

                // Mostra o modal quando o componente é montado
                this.modalInstance.show();
            }
        });
    },
    watch: {
        clienteOriginal: {
            handler(novo) {
                this.cliente = JSON.parse(JSON.stringify(novo));
            },
            immediate: true
        }
    },
    methods: {
        async salvarEdicao() {
            try {
                if (this.isSaving) return; // Evita duplo clique
                this.isSaving = true;
                const response = await fetch(`http://localhost:5247/clientepf/${this.cliente.id_cliente_pf}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.cliente)
                });

                if (response.ok) {
                    alert('Cliente atualizado com sucesso!');
                    this.$emit('atualizado');
                    // Fecha o modal e remove o backdrop
                    if (this.modalInstance) {
                        this.modalInstance.hide();

                        // Força a remoção do backdrop (às vezes necessário)
                        setTimeout(() => {
                            const backdrop = document.querySelector('.modal-backdrop');
                            if (backdrop) backdrop.remove();
                        }, 100);
                    }
                    $('#editarClienteModal').modal('hide'); // Fecha com jQuery
                    this.$emit('fechadoComRedirecionamento');
                } else {
                    alert('Erro ao atualizar cliente.');
                }
            } catch (error) {
                console.error('Erro ao atualizar cliente:', error);
                alert('Erro na requisição.');
            }
            this.isSaving = false;
        },

        fecharModal() {
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            const backdrop = document.getElementById('backdrop-manual');
            if (backdrop) backdrop.remove();
        }
    }
};
</script>

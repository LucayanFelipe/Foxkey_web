<template>
    <Modal title="Editar Cliente PJ" size="lg" @close="fecharModal" @confirm="salvarAlteracoes">
        <template #body>
            <!-- DADOS EMPRESARIAIS -->
            <div class="form-group mb-2">
                <label>Nome Fantasia</label>
                <input type="text" class="form-control" v-model="cliente.nome_fantasia" required />
            </div>

            <div class="form-group mb-2">
                <label>Razão Social</label>
                <input type="text" class="form-control" v-model="cliente.razao_social" />
            </div>

            <div class="form-group mb-2">
                <label>Inscrição Municipal</label>
                <input type="text" class="form-control" v-model="cliente.inscricao_municipal" />
            </div>

            <div class="form-group mb-2">
                <label>CNPJ</label>
                <input type="text" class="form-control" v-model="cliente.cnpj" required />
            </div>

            <div class="form-group mb-2">
                <label>Data de Abertura</label>
                <input type="date" class="form-control" v-model="cliente.data_abertura" required />
            </div>

            <div class="form-group mb-2">
                <label>Representante</label>
                <input type="text" class="form-control" v-model="cliente.representante" required />
            </div>

            <hr />

            <!-- ENDEREÇO E CONTATO -->
            <div class="form-group mb-2">
                <label>Rua</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.rua" />
            </div>

            <div class="form-group mb-2">
                <label>Número</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.numero" />
            </div>

            <div class="form-group mb-2">
                <label>Bairro</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.bairro" />
            </div>

            <div class="form-group mb-2">
                <label>Complemento</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.complemento" />
            </div>

            <div class="form-group mb-2">
                <label>Referência</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.referencia" />
            </div>

            <div class="form-group mb-2">
                <label>CEP</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.cep" />
            </div>

            <div class="form-group mb-2">
                <label>Estado</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.estado" />
            </div>

            <div class="form-group mb-2">
                <label>Cidade</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.cidade" />
            </div>

            <div class="form-group mb-2">
                <label>Email</label>
                <input type="email" class="form-control" v-model="cliente.enderecoContato.email" />
            </div>

            <div class="form-group mb-2">
                <label>Celular</label>
                <input type="text" class="form-control" v-model="cliente.enderecoContato.celular" />
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/Modal.vue';

export default {
    name: 'EditarClientePJModal',
    components: { Modal },
    props: {
        clienteOriginal: Object
    },
    data() {
        return {
            cliente: {
                nome_fantasia: '',
                razao_social: '',
                inscricao_municipal: '',
                cnpj: '',
                data_abertura: '',
                representante: '',
                enderecoContato: {
                    rua: '',
                    numero: '',
                    bairro: '',
                    complemento: '',
                    referencia: '',
                    cep: '',
                    estado: '',
                    cidade: '',
                    email: '',
                    celular: ''
                }
            }
        };
    },
    mounted() {
        if (this.clienteOriginal) {
            // Clona objeto para evitar mutação direta no prop
            this.cliente = JSON.parse(JSON.stringify(this.clienteOriginal));
        }
    },
    methods: {
        fecharModal() {
            this.$emit('fechado');
        },
        async salvarAlteracoes() {
            try {
                const response = await fetch(`http://localhost:5247/clientepj/${this.cliente.id_cliente_pj}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.cliente)
                });

                if (response.ok) {
                    alert('Cliente PJ atualizado com sucesso!');
                    this.$emit('atualizado');
                    this.fecharModal();
                } else {
                    const error = await response.json();
                    alert(error.message || 'Erro ao atualizar cliente PJ.');
                }
            } catch (err) {
                console.error('Erro ao atualizar cliente PJ:', err);
                alert('Erro ao atualizar cliente PJ.');
            }
        }
    }
};
</script>

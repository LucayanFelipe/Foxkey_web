<!-- components/ui/Modal.vue -->
<template>
    <teleport to="body">
        <div class="modal fade show d-block" tabindex="-1" role="dialog"
            style="background: rgba(0, 0, 0, 0.5); z-index: 1050;">
            <div class="modal-dialog" :class="modalSizeClass" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="close" @click="$emit('close')" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <slot name="body" />
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
                            <button type="button" class="btn btn-primary" @click="$emit('confirm')">Salvar</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: 'Modal'
        },
        size: {
            type: String,
            default: 'lg', // opções: sm, md, lg, xl
        }
    },
    computed: {
        modalSizeClass() {
            return {
                'modal-sm': this.size === 'sm',
                'modal-lg': this.size === 'lg',
                'modal-xl': this.size === 'xl',
            };
        }
    }
};
</script>

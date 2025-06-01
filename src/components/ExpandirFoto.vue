<!-- Nao esta sendo utilizado, mas pode ser usado para expandir uma foto -->
<template>
    <v-dialog v-model="dialog">
        <v-card id="cardDescricao">
            teste
        </v-card>   
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

// Props do componente
const props = defineProps<{
    valorModal: boolean
}>()

const emit = defineEmits<{
    (e: 'update:valorModal', value: boolean): void
    
}>()

const dialog = ref(props.valorModal)

// Sincronizar entrada externa com ref interna
watch(() => props.valorModal, (val) => {
    if (dialog.value !== val) dialog.value = val
})

// Atualizar valor externo quando o diálogo fecha
watch(dialog, (val) => {
    emit('update:valorModal', val)
})

</script>
<style>
#opc-sumario {
    font-size: 11px;
    margin-top: -1%;
}

#text-opc-sumario {
    white-space: normal;
    word-wrap: break-word;
    text-align: left;
}

@media (min-width: 501px) {
    #cardDescricao {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        width: 700px;
        margin: auto;
    }
}

#tituloCardDescricao {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 10px;
}
</style>
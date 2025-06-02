<!-- Nao esta sendo utilizado, mas pode ser usado para expandir uma foto -->
<template>
    <v-dialog v-model="dialog">
        <v-card>
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
</style>
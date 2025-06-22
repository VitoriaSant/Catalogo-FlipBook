<template>
    <v-dialog v-model="props.valorModal">
        <v-card id="Detalhecard">
            <v-card-title class="bg-primary" id="tituloCard">
                <v-row>
                    <v-col cols="10" class="text-h6 border-right">
                        Sumário
                    </v-col>
                    <v-col cols="2" class="d-flex justify-end">
                        <v-btn variant="outlined" id="btnTelaCard" icon="mdi-close" class="aling-end"
                            @click="emit('update:valorModal', false)" v-tooltip="'Fechar'"></v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <div v-for="numPag in Math.ceil(filtroProdutos.length / 25)" :key="numPag">
                <p v-for="(produto, i) in filtroProdutos.slice((numPag - 1) * 25, numPag * 25)" :key="i">
                    <v-btn id="opc-sumario" variant="plain" @click="$emit('onSelectPag', produto.paginaDoProduto); emit('update:valorModal', false)" >
                        <div id="text-opc-sumario">{{ produto.paginaDoProduto }} - {{ produto?.descricao }}</div>
                    </v-btn>
                </p>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'


// Props do componente
const props = defineProps<{
    valorModal: boolean
    filtroProdutos: Array<{
        paginaDoProduto: number
        descricao: string
    }>

}>()

const emit = defineEmits<{
    (e: 'update:valorModal', value: boolean): void
    (e: 'onSelectPag', page: number): void
}>()

const dialog = ref(props.valorModal)

// Sincronizar entrada externa com ref interna
watch(() => props.valorModal, (val) => {
    if (dialog.value !== val) dialog.value = val
})

// Atualizar valor externo quando o diálogo fecha
watch(dialog, (val) => {
    if (props.valorModal !== val) emit('update:valorModal', val)
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

#tituloCardSumario {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 10px;
}
</style>
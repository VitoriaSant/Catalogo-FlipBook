<!-- Nào esta sendo utilizado para exibir a pesquisa de produtos -->
<template>
    <v-dialog v-model="dialog">
        <v-card id="Detalhecard">
            <v-card-title class="bg-primary" id="tituloCard">
                <v-row>
                    <v-col cols="10" class="text-h6 border-right">
                        Pesquisa
                    </v-col>
                    <v-col cols="2" class="d-flex justify-end">
                        <v-btn variant="outlined" id="btnTelaCard" icon="mdi-close" class="aling-end"
                            @click="dialog = false" v-tooltip="'Fechar'"></v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
                    <v-autocomplete
                        id="autocomplete"
                        label="Pesquisa"
                        clearable
                        :items="filtroProdutos"
                        :item-title="'descricao'"
                        :item-value="'paginaDoProduto'"
                        v-model="produtoSelecionado"
                        :return-object="true"
                        @update:modelValue="onSelect"
                        >
                    </v-autocomplete>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const produtoSelecionado = ref<any | null>(null)

const onSelect = (produtoSelecionado: any) => {
    if (produtoSelecionado && produtoSelecionado.paginaDoProduto) {
        const pagina = produtoSelecionado.paginaDoProduto
        emit('selectPag', pagina)
    }
}

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
    (e: 'selectPag', page: number): void
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

#tituloCardPesquisa {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 10px;
}
</style>
<!-- Nào esta sendo utilizado para exibir a pesquisa de produtos -->
<template>
    <v-dialog id="PesquisaItem" v-model="dialog">
        <v-card id="Detalhecard">
            <v-card-title class="bg-primary" id="tituloCard">
                <v-row>
                    <v-col cols="10" class="text-h6 border-right ">
                        Pesquisa
                    </v-col>
                    <v-col cols="2" class="d-flex justify-end">
                        <v-btn variant="outlined" id="btnTelaCard" icon="mdi-close" size="small" class="aling-end"
                            @click="dialog = false" v-tooltip="'Fechar'"></v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-autocomplete 
                id="autocomplete" 
                label="Pesquisar sobre" 
                clearable 
                :items="pesquisaSobre"
                v-model="filtroSelecionado"
                :item-title="item => `${item.label}`"
                :item-value="item => `${item.value}`"
                @update:modelValue="OnFiltroChange"   
            </v-autocomplete>

            <v-autocomplete 
                id="autocomplete-produto"
                label="Pesquisa"
                clearable
                :items="produtosFiltrados"
                :item-title="item => GetTituloProduto(item)"
                v-model="produtoSelecionado"
                :return-object="true"
                v-model:search="textoPesquisa"
                @update:modelValue="OnSelect"
            />
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const produtoSelecionado = ref<any | null>(null)
const filtroSelecionado = ref<string>('descricao')
const textoPesquisa = ref('')
const titulo = ref<string>('')

const emit = defineEmits<{
    (e: 'update:valorModal', value: boolean): void
    (e: 'onSelect', item: any): void
}>()

const pesquisaSobre = [
    { label: 'Descrição', value: 'descricao' },
    { label: 'Cor', value: 'desCor' },
    { label: 'Variação', value: 'desVariacao' },
    { label: 'Acabamento', value: 'desAcabamento' },
    { label: 'Tipo de Produto', value: 'tipoProduto' },
    { label: 'Coleção', value: 'colecao' },
    { label: 'Linha', value: 'linha' },
    { label: 'Grupo', value: 'grupo' },
    { label: 'Subgrupo', value: 'subgrupo' }
]

// Props do componente
const props = defineProps<{
    valorModal: boolean
    filtroProdutos: Array<{
        paginaDoProduto: number
        descricao: string
        tipoProduto: string
        colecao: string
        linha: string
        grupo: string
        subgrupo: string
        detalhamentos: Array<{
            desCor?: string
            desVariacao?: string
            desAcabamento?: string
        }>
    }>
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

function OnFiltroChange(valor: string) {
    filtroSelecionado.value = valor
    textoPesquisa.value = ''
    produtoSelecionado.value = null
    console.log('Filtro selecionado:', valor)
}

function OnSelect(item: any) {
    emit('onSelect', item)
    dialog.value = false
}

function GetTituloProduto(produto: any): string {

    switch (filtroSelecionado.value) {
        case 'descricao':
            return produto.descricao
        case 'tipoProduto':
            titulo.value = produto.tipoProduto == 'INDEFINIDO' ? produto.descricao : `${produto.descricao} - Tipo Produto: ${produto.tipoProduto}`
            return titulo.value

        case 'colecao':
            titulo.value = produto.colecao == 'INDEFINIDA' ? produto.descricao : `${produto.descricao} - Coleção: ${produto.colecao}`
            return titulo.value

        case 'linha':
            titulo.value = produto.linha == 'INDEFINIDO' ? produto.descricao : `${produto.descricao} - Linha: ${produto.linha}`
            return titulo.value

        case 'grupo':
            titulo.value = produto.grupo == 'INDEFINIDO' ? produto.descricao : `${produto.descricao} - Grupo: ${produto.grupo}`
            return titulo.value

        case 'subgrupo':
            titulo.value = produto.subgrupo == 'INDEFINIDO' ? produto.descricao : `${produto.descricao} - Subgrupo: ${produto.subgrupo}`
            return titulo.value
    }

    const campo = filtroSelecionado.value

    // Pega o primeiro valor encontrado no detalhamento correspondente
    const match = produto.detalhamentos.find((det: any) => {
        const val = det[campo]
        return typeof val === 'string' && val.toLowerCase().includes(textoPesquisa.value.toLowerCase())
    })
    switch (campo) {
        case 'desCor':
            titulo.value = match?.desCor == 'INDEFINIDA' ? produto.descricao : `${produto.descricao} - Cor: ${match.desCor}`
            return titulo.value
        case 'desVariacao':
            titulo.value = match?.desVariacao == 'INDEFINIDA' ? produto.descricao : `${produto.descricao} - Variação: ${match.desVariacao}`
            return titulo.value
        case 'desAcabamento':
            titulo.value = match?.desAcabamento == 'INDEFINIDO' ? produto.descricao : `${produto.descricao} - Acabamento: ${match.desAcabamento}`
            return titulo.value
    }
    return produto.descricao
}

const produtosFiltrados = computed(() => {
    if (!textoPesquisa.value) return props.filtroProdutos

    const texto = textoPesquisa.value.toLowerCase()
    const campo = filtroSelecionado.value // Ex: 'descricaoCor'

    return props.filtroProdutos.filter(produto => {
        // Caso seja a descrição do produto
        switch (campo) {
            case 'descricao':   
                return produto.descricao.toLowerCase().includes(texto)
            case 'tipoProduto': 
                return produto.tipoProduto.toLowerCase().includes(texto)
            case 'colecao':     
                return produto.colecao.toLowerCase().includes(texto)
            case 'linha':       
                return produto.linha.toLowerCase().includes(texto)
            case 'grupo':       
                return produto.grupo.toLowerCase().includes(texto)
            case 'subgrupo':    
                return produto.subgrupo.toLowerCase().includes(texto)
        }
        // Caso o produto tenha detalhamentos
        if (Array.isArray(produto.detalhamentos)) {
            return produto.detalhamentos.some((det: any) => {
            const valor = det[campo]
            return typeof valor === 'string' && valor.toLowerCase().includes(texto)
            })
        }
    })
})

</script>
<style>
</style>
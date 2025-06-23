<template>
<v-dialog v-model="dialog">
    <v-card id="Detalhecard">
        <v-card-title class="bg-primary" id="tituloCard">
            <v-row>
                <v-col cols="10" class="text-h6 border-right ">
                    {{ produto.descricao }}
                </v-col>
                <v-col cols="2" class="d-flex justify-end">
                    <v-btn variant="outlined" id="btnTelaCard" icon="mdi-close" size="small" class="aling-end"
                        @click="dialog = false" v-tooltip="'Fechar'"></v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <div id="descricaoResumida">
        {{ produto.descricaoResumida }}
        </div>
        <div id="conteudoTabeladoDescricao">
            <v-row v-if="produto.colecao !== 'INDEFINIDA'">
                <v-col>
                    Coleção:
                </v-col> 
                <v-col>
                    {{ produto.colecao }}
                </v-col>
            </v-row>
            <v-row v-if="produto.linha !== 'INDEFINIDA'">
                <v-col>
                    Linha:
                </v-col>
                <v-col>
                    {{ produto.linha }}
                </v-col>
            </v-row>
            <v-row v-if="produto.grupo !== 'INDEFINIDO'">
                <v-col>
                    Grupo:
                </v-col>
                <v-col>
                    {{ produto.grupo }}
                </v-col>
            </v-row>
            <v-row v-if="produto.altura !== 0">
                <v-col>
                    Altura:
                </v-col>
                <v-col>
                    {{ produto.altura }}
                </v-col>
            </v-row>
            <v-row v-if="produto.largura !== 0">
                <v-col>
                    Largura:
                </v-col>
                <v-col>
                    {{ produto.largura }}
                </v-col>
            </v-row>
            <v-row v-if="produto.comprimento !== 0">
                <v-col>
                    Comprimento:
                </v-col>
                <v-col>
                    {{ produto.comprimento }}
                </v-col>
            </v-row>
            <v-row v-if="produto.pesoBruto !== 0">
                <v-col>
                    Preço Bruto:
                </v-col>
                <v-col >
                    {{ produto.pesoBruto }}
                </v-col>
            </v-row>
            <v-row v-if="produto.pesoLiquido !== 0">
                <v-col>
                    Peso Liquido:
                </v-col>
                <v-col>
                    {{ produto.pesoLiquido }}
                </v-col>
            </v-row>
        </div>
    </v-card>
</v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'


// Props do componente
const props = defineProps<{
    valorModal: boolean
    produto: {
        descricao: string
        descricaoResumida: string
        colecao: string
        linha: string
        grupo: string
        altura: number
        largura: number
        comprimento: number
        pesoBruto: number
        pesoLiquido: number
        mostrarDescricao: boolean
    }
}>()

const emit = defineEmits<{
    (e: 'update:mostrarDescricao', value: boolean): void
}>()

const dialog = ref(props.produto.mostrarDescricao)

// Sincronizar entrada externa com ref interna
watch(() => props.produto.mostrarDescricao, (val) => {
    dialog.value = val
})

// Atualizar valor externo quando o diálogo fecha
watch(dialog, (val) => {
    emit('update:mostrarDescricao', val)
})
</script>
<style>
#conteudoTabeladoDescricao {
    margin-top: 20px;
    text-align: center;
}
#descricaoResumida {
    margin-top: 10px;
    text-align: justify;
}
</style>
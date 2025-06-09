<!-- Nao esta sendo utilizado, mas pode ser usado para expandir uma foto -->
<template>
    <v-dialog v-model="dialog" fullscreen>
        <template v-if="produtoSelecionado">
            <v-carousel :height="windowWidth > 500 ? '800px' : '500px'" show-arrows="hover" hide-delimiter-background
                width="100%">
                <v-carousel-item v-for="(detalhe, imgId) in produtoSelecionado.detalhamentoSelecionado?.imagens"
                    :key="imgId">
                    <div>
                        <v-btn icon="mdi-close" @click="dialog = false" id="btnTelaCheia"></v-btn>
                    </div>
                    <v-sheet class="d-flex align-center justify-center" id="sheetTelaCheia"
                        :height="windowWidth > 500 ? '800px' : '500px'">
                        <img class="bg-grey-lighten-2" :class="windowWidth > 500 ? '900' : '500px'" :src="detalhe.url"
                            alt="Imagem do produto" />
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

// Props do componente
const props = defineProps<{
    valorModal: boolean
    windowWidth: number
    produtoSelecionado: {
        detalhamentoSelecionado?: {
            imagens: Array<{
                url: string
            }>
        }
    } | null
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
<style></style>
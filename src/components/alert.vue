<template>
    <div class="d-flex flex-column align-center bg-custom_gray">
        <v-sheet
        class="pa-4 text-center mx-auto mt-5"
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
        >
        <v-icon class="mb-5" color="error" icon="mdi-close-circle-outline" size="112"></v-icon>

        <h2 class="text-h5 mb-6">{{ props.tituloErro }}</h2>

        <p class="mb-4 text-medium-emphasis text-body-2">
            {{ props.mensagem }}
        </p>

        <v-divider class="mb-4"></v-divider>

        <div class="text-end">
            <v-btn class="text-none" color="error" variant="flat" width="90" rounded @click="recarregar">
            Recarregar
            </v-btn>
        </div>
        </v-sheet>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{mensagem: string; tituloErro: string}>()

const recarregar = () => {
    location.reload()
}
</script>


<template>
    <v-row class="bg-primary" id="todosBotoesDeNavegacao">
        <v-col class="d-flex justify-end">
            <v-btn variant="outlined" icon="mdi-arrow-left-bold" v-tooltip="'Página anterior'" @click="$emit('onAntPag')"></v-btn>
        </v-col>
        <v-col class="d-flex justify-center" id="botoesDeNavegacaoCentral">
            <v-btn variant="outlined" icon="mdi-home-outline" v-tooltip="'Mostruários'" @click="$emit('onMostruario')"></v-btn>
            <v-btn variant="outlined" icon="mdi-format-list-numbered-rtl" v-tooltip="'Sumário'" @click="$emit('onClickSumario')"></v-btn>
            <v-btn variant="outlined" icon="mdi-magnify" v-tooltip="'Pesquisa'" @click="$emit('onPesquisa')"></v-btn>
        </v-col>
        <v-col class="d-flex justify-start" v-tooltip="'Próxima página'">
            <v-btn variant="outlined" icon="mdi-arrow-right-bold" @click="$emit('onProxPag')"></v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>   

</script>

<style> 
#todosBotoesDeNavegacao {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    margin-bottom: 1px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
#botoesDeNavegacaoCentral {
    gap: 6px;
}
</style>
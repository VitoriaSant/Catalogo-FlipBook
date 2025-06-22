<template>
    <v-card id="Detalhecard">
        <v-card-title class="bg-primary" id="tituloCard">
            <v-row>
                <v-col cols="10" class="text-h6 border-right ">
                    Titulo
                </v-col>
                <v-col cols="2" class="d-flex justify-end">
                    <v-btn variant="outlined" id="btnTelaCard" icon="mdi-close" size="small" class="aling-end"
                        @click="" v-tooltip="'Fechar'"></v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        Texto
    </v-card>
</template>

<script lang="ts" setup>

</script>
<style>
#Detalhecard {
    max-width: 100%;
    max-height: 100%;
    padding: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    text-align: center;
}
#tituloCard {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1%;
    border-radius: 5px;
}
#btnTelaCard.v-btn {
    min-width: 40px !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 50% !important;
    padding: 0 !important;
}
</style>
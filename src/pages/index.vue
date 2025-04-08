<template>
  <v-progress-circular id="loading" v-if="loading" color="dark-blue" indeterminate :size="57" />
  <Alerta v-if="alert" :mensagem="mensagem" :titulo-erro="tituloErro"/>
  <ListarCatalogos :catalogos="ListaCat.catalogos" v-if="ListaCat.catalogos.length > 0" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { getMostruarios } from '@/services/getMostruarios'
import { ListaCatalogos } from '@/classes/catalogo'
import Alerta from '@/components/alert.vue'

const loading = ref<boolean>(false)

const ListaCat = ref<ListaCatalogos>(new ListaCatalogos([]))

let alert = ref<boolean>(false)
let mensagem = ''
let tituloErro = ''

onMounted(async () => {
  try {
    loading.value = true
    ListaCat.value = await getMostruarios()
    console.log(ListaCat.value)
    loading.value = false
  } catch (error: any) {
    alert.value = true
    loading.value = false
    tituloErro = String(error.error.name)
    mensagem = String(error.messageError + ' - ' + error.error.message)
  }
})
</script>
<style>
#loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>

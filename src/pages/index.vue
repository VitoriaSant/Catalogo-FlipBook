<template>
  <v-progress-circular id="loading" v-if="loading" color="dark-blue" indeterminate :size="57" />

  <v-dialog v-model="alert" max-width="500">
    <v-card>
      <v-card-title>{{ tituloErro }}</v-card-title>
      <v-card-text>{{ mensagem }}</v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="recarregar">Recarregar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <ListarCatalogos :catalogos="ListaCat.catalogos" v-if="ListaCat.catalogos.length > 0"/>
  <!-- <Book :title="lista.empresa" :produtos="lista.produtos" v-if="lista.produtos.length > 0" /> -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { auth } from '../services/auth'
import { getProdutos } from '../services/getProduto'
import { ListaProduto } from '@/classes/produto'
import { getMostruarios } from '@/services/getMostruarios'
import { ListaCatalogos } from '@/classes/Catalogo'

const loading = ref<boolean>(false)
const lista = ref<ListaProduto>(new ListaProduto('', []))
const ListaCat = ref<ListaCatalogos>(new ListaCatalogos([]))

let alert = ref<boolean>(false)
let mensagem = ''
let tituloErro = ''

const recarregar = () => {
  alert.value = false
  sessionStorage.clear()
  location.reload()
}

function ordenarProdutos(produtos: any) {
  return produtos.sort((a: any, b: any) => {
    // // Ordena primeiro pelo 'grupo'
    // if (a.grupo < b.grupo) return -1
    // if (a.grupo > b.grupo) return 1

    if (a.nome < b.nome) return -1
    if (a.nome > b.nome) return 1

    return 0
  })
}

onMounted(async () => {
  ListaCat.value = await getMostruarios()
  console.log(ListaCat.value.catalogos)
  try {
    loading.value = true
    if (!sessionStorage.getItem('auth_token')) {
      await auth()
    }

    const token = sessionStorage.getItem('auth_token')
    if (!token) {
      mensagem = 'Token não encontrado.'
    } else {
      lista.value = await getProdutos(token)
      lista.value.produtos = ordenarProdutos(lista.value.produtos)
      console.log(lista.value)
    }
  } catch (error: any) {
    if (error instanceof Error) {
      mensagem = error.name
    } else {
      tituloErro = String(error.error.name)
      mensagem = String(error.messageError + ' : ' + error.error.message)
    }
    alert.value = true
    throw error
  } finally {
    loading.value = false
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

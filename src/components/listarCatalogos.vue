<template>
  <Alerta v-if="alert" :mensagem="mensagem" :titulo-erro="tituloErro"/>
  <v-progress-circular id="loading" v-if="loading" color="dark-blue" indeterminate :size="57" />
  <div id="tabela" v-if="ListaCat.catalogos.length > 0">
    <v-table v-if="listaMostruarios">
      <thead>
        <tr>
          <th class="text-center">Mostruários</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(catalogo, id) in ListaCat.catalogos" :key="id">
          <td>
            <v-btn @click="mostruariosSelecionado(catalogo.catalogo)">
              {{ catalogo.catalogo }} - {{ catalogo.descricaoCatalago }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <!-- <div v-else="mostruariosSelecionado(ListaCat.catalogos[0].catalogo)">
  {{ ListaCat.catalogos[0].catalogo }}
  </div> -->
  <!-- <div v-else>
    <template v-if="ListaCat.catalogos?.length">
      <v-btn @click="mostruariosSelecionado(ListaCat.catalogos[0].catalogo)">
        {{ ListaCat.catalogos[0]?.catalogo }} - {{ ListaCat.catalogos[0]?.descricaoCatalago }}
      </v-btn>
    </template>
    <p v-else>Nenhum catálogo encontrado.</p>
  </div> -->
  <v-progreifss-circular id="loading" v-if="loading" color="dark-blue" indeterminate :size="57" />
  <Book
    :catalogo="lista.catalogo"
    :descricaoCatalago="lista.descricaoCatalago"
    :empresa="lista.empresa"
    :empresaDescricao="lista.empresaDescricao"
    :produtos="lista.produtos"
    v-if="lista.produtos.length > 0 && abrirMostruarios === true"
  />
</template>

<script lang="ts" setup>
import { Catalogo } from '@/classes/catalogo'
import { getProdutos } from '../services/getitens'
import { ListaProduto } from '@/classes/produtosCatalogo'
import { getMostruarios } from '@/services/getMostruarios'
import { ListaCatalogos } from '@/classes/catalogo'
import Alerta from '@/components/alert.vue'

// const props = defineProps<{ catalogos: Catalogo[] }>()
// const filtroMostruarios = ref<Catalogo[]>(props.catalogos)
const lista = ref<ListaProduto>(new ListaProduto(0, '', 0, '', []))
const loading = ref<boolean>(false)
const listaMostruarios = ref<boolean>(true)
const abrirMostruarios = ref<boolean>(false)
const ListaCat = ref<ListaCatalogos>(new ListaCatalogos([]))

let alert = ref<boolean>(false)
let mensagem = ''
let tituloErro = ''


async function mostruariosSelecionado(idostruarios: number) {
  try {
    listaMostruarios.value = false
    abrirMostruarios.value = true
    loading.value = true
    lista.value = await getProdutos(idostruarios)
    lista.value.produtos = ordenarProdutos(lista.value.produtos)
    loading.value = false
  } catch (error: any) {
    loading.value = false
    tituloErro = String(error.error.name)
    mensagem = String(JSON.stringify(error.error.response.data.error) + ' - ' + error.error.message)
    alert.value = true
  }
}

// Função para ordenar os produtos por nome
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
  try {
    loading.value = true
    ListaCat.value = await getMostruarios()
    loading.value = false
    if (ListaCat.catalogos.length == 1) {
      consolo.log('tem 1')
    }
  } catch (error: any) {
    console.log(error.message)
    tituloErro = String(error.error.name)
    mensagem = String(error.messageError + ' : ' + error.error.message)
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

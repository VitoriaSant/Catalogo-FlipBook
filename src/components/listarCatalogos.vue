<template>
  <alerta v-if="alert" :mensagem="mensagem" :titulo-erro="tituloErro" />
  <v-progress-circular id="loading" v-if="loading" color="dark-blue" indeterminate :size="57" />

  <div id="tabela" v-if="ListaCat.catalogos.length > 0">
    <v-table v-if="listaMostruarios">
      <thead>
        <tr>
          <th class="text-center">Códigos</th>
          <th class="text-center">Mostruários</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(catalogo, id) in ListaCat.catalogos" :key="id"  @click="mostruariosSelecionado()">
          <td class="text-center">{{ catalogo.catalogo }}</td>
          <td class="text-center">{{ catalogo.descricaoCatalago }}</td>
          
        </tr>
      </tbody>
    </v-table>
  </div>

  <v-progress-circular id="loading" v-if="loading" color="dark-blue" indeterminate :size="57" />
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
import { getProdutos } from '../services/getItens'
import { ListaProduto } from '@/classes/produtosCatalogo'
import alerta from '@/components/alert.vue'

const props = defineProps<{ catalogos: Catalogo[] }>()
const lista = ref<ListaProduto>(new ListaProduto(0, '', 0, '', []))
const loading = ref<boolean>(false)
const listaMostruarios = ref<boolean>(true)
const abrirMostruarios = ref<boolean>(false)
// const ListaCat = computed(() => ({ catalogos: props.catalogos }))
const ListaCat = computed(() => props.catalogos)

let alert = ref<boolean>(false)
let mensagem = ''
let tituloErro = ''

onMounted(async () => {
  alert.value = false
  try {
    // lista.value = await getProdutos(idMostruarios)
    // lista.value.produtos = ordenarProdutos(lista.value.produtos)
    
    //inicio dados mockados
    const res = await fetch('/Produto.json')
    if (!res.ok) {
      throw new Error(`Erro ao carregar Produto.json: ${res.status}`)
    }
    const data = await res.json()
  
    lista.value = new ListaProduto(
      data.catalogo,
      data.descricaoCatalago,
      data.empresa,
      data.empresaDescricao,
      data.itens
    )
    //fim dados mockados

    loading.value = false
    console.log( lista.value)
  } catch (error: any) {
    loading.value = false
    tituloErro = String(error.error.name)
    mensagem = String(JSON.stringify(error.error.response.data.error) + ' - ' + error.error.message)
    alert.value = true
  }

  if (ListaCat.value.length === 1) {
  mostruariosSelecionado()
  {{"1 so"}}
} else {
    listaMostruarios.value = true
    abrirMostruarios.value = false
  }
})

async function mostruariosSelecionado() {
// async function mostruariosSelecionado(idMostruarios: number) {
  loading.value = true
  listaMostruarios.value = false
  abrirMostruarios.value = true
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
</script>
<style>
#loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

table {
  max-width: 95%;
  margin: auto;
  margin-top: 2%;
  border-radius: 8px;
  margin-bottom: 10%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  border-collapse: collapse;
}

table tr:nth-child(even),
thead {
  background-color: #eeeeeefc; /*linhas com cores intercaladas */
  border-radius: 8px; /* bordas arredondadas */  
}

table tbody tr:hover {
  background-color: #adacac; /* azul bem claro */
  transform: scale(1.01); /* leve efeito de zoom */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* sombra leve na linha */
}

</style>

<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <v-progress-circular id="loading" v-if="loading" color="dark-blue" indeterminate :size="57" />
  <Alerta v-if="alert" :mensagem="mensagem" :titulo-erro="tituloErro" />

  <div id="tabela" v-if="tabela">
    <v-table v-if="listaMostruarios">
      <thead>
        <tr>
          <th class="text-center">Códigos</th>
          <th class="text-center">Mostruários</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(catalogo, id) in listaMostr"
          :key="id"
          @click="OnMostruariosSelecionado(catalogo.autoincMst)"
        >
          <td class="text-center">{{ catalogo.autoincMst }}</td>
          <td class="text-center">{{ catalogo.descricaoMst }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { GetMostruarios } from '@/services/getMostruarios'
import { ListaMostruario } from '@/classes/Mostruario'
import Alerta from '@/components/Alert.vue'



const router = useRouter()
const loading = ref<boolean>(false)
const listaMostruarios = ref<boolean>(true)
const tabela = ref<boolean>(true)
const listaMostr = ref<ListaMostruario[]>([])


let alert = ref<boolean>(false)
let mensagem = ''
let tituloErro = ''

onMounted(async () => {
  loading.value = true
  alert.value = false
  try {
    const resposta = await GetMostruarios()
    listaMostr.value = Array.isArray(resposta) ? resposta : []
    loading.value = false

  } catch (error: any) {
    alert.value = true
    tabela.value = false
    loading.value = false
    if (error && error.error) {
      tituloErro = String(error.error.name || 'Erro')
      mensagem = String(error.error.message || error.message || 'Erro desconhecido')
    } else {
      tituloErro = String(error.name || 'Erro')
      mensagem = String(error.message || 'Erro desconhecido')
    }
  }
})

async function OnMostruariosSelecionado(idMostruarios: number) {
  try {
    loading.value = true
    alert.value = false
    listaMostruarios.value = false

    router.push({ path: `/mostruario/${idMostruarios}` })
  } catch (error: any) {
    loading.value = false
    alert.value = true
    tituloErro = error?.error.name || 'Erro desconhecido'
    mensagem =
      JSON.stringify(error.error.response.data.error) ||
      error?.error.message ||
      error?.message ||
      'Erro desconhecido'
  } finally {
    loading.value = false
  }
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
  background-color: #eeeeeefc;
  border-radius: 8px;
}

table tbody tr:hover {
  background-color: #adacac;
  transform: scale(1.01);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>

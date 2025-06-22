<template class="bg-custom_gray">
  <v-progress-circular id="loading" v-if="loading" color="dark-blue" indeterminate :size="57" />
  <Alerta v-if="alert" :mensagem="mensagem" :titulo-erro="tituloErro" />
  <div class="container bg-custom_gray">
    <div class="flip-book" id="book">
      <div class="page page-cover page-cover-top bg-custom_gray_dark">
        <div id="capaCatalogo">
          <h2>{{ lista?.descricaoMst }}</h2>
          <v-sheet class="d-flex align-center justify-center">
            <v-img
              v-if="!imgErro"
              class="bg-custom_gray_dark"
              :height="windowWidth > 500 ? '600px' : '450px'"
              :src="imgCapa"
              @error="imgErro = true"
            />
            <v-img
              v-else
              class="bg-custom_gray_dark"
              :height="windowWidth > 500 ? '600px' : '400px'"
              :src="errorImg"
            />
          </v-sheet>
        </div>
      </div>
      <!-- Pagina de produtos -->
      <div class="page" v-for="(produto, index) in filtroProdutos" :key="index">
        <div class="page-content">
          <h1 class="page-header">{{ produto?.descricao }}</h1>
          <!-- Imagem do Produto -->
          <div class="carousel-img">
            <v-carousel
              :height="windowWidth > 500 ? '540px' : '300px'"
              show-arrows="hover"
              hide-delimiter-background
              width="100%"
              :continuous="false"
            >
              <v-carousel-item
                v-for="(detalhe, imgId) in produto.detalhamentoSelecionado?.imagens"
                :key="imgId"
              >
                <v-sheet height="100%" class="d-flex align-center justify-center">
                  <v-img
                    v-if="!imgErro"
                    class="bg-custom_gray_dark"
                    :src="detalhe.url"
                    @error="imgErro = true"
                  />
                  <v-img
                    v-else
                    class="bg-custom_gray_dark"
                    :src="errorImg"
                  />
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>
          <!-- Seleçao de detalhamento -->
              <v-select
                id="select-detalhe"
                class="altura-fixa-select"
                label="Detalhamento"
                variant="solo-filled"
                density="compact"
                :items="produto.detalhamentos"
                :item-title="(item) => concatenarDetalhe(item)"
                :return-object="true"
                v-model="produto.detalhamentoSelecionado"
              >
              </v-select>
    
          <v-row class="d-flex justify-center" id="botoesPagina">
            <!-- Botão de descricao do produto -->
            <v-col cols="6" class="d-flex justify-end btnInfo">
              <div>
                <div
                  v-if="
                    produto.colecao == 'INDEFINIDA' &&
                    produto.linha == 'INDEFINIDA' &&
                    produto.grupo == 'INDEFINIDO' &&
                    produto.altura == 0 &&
                    produto.largura == 0 &&
                    produto.comprimento == 0 &&
                    produto.descricaoResumida == null &&
                    produto.pesoBruto == 0 &&
                    produto.pesoLiquido == 0
                  "
                >
                  <v-btn
                    variant="tonal"
                    v-tooltip="'Descrição'"
                    :disabled="true"
                    icon="mdi-exclamation-thick"
                  ></v-btn>
                </div>
                <div v-else>
                  <v-btn
                    variant="tonal"
                    v-tooltip="'Descrição'"
                    icon="mdi-exclamation-thick"
                    @click="exibirDetalhamento(produto)"
                  ></v-btn>
                </div>
                <Descricao
                  v-if="exibirDescricao"
                  :valorModal="exibirDescricao"
                  :produto="{
                    ...produto,
                    mostrarDescricao: produto.mostrarDescricao ?? false
                  }"
                  @update:mostrarDescricao="produto.mostrarDescricao = $event"
                />
              </div>
            </v-col>
            <!-- Expandir imagem -->
            <v-col cols="6" class="d-flex justify-start btnInfo">
              <div>
                <v-btn
                  variant="tonal"
                  v-tooltip="'Expandir'"
                  icon="mdi-magnify-expand"
                  @click="expandirImg(produto)"
                ></v-btn>
              </div>
            </v-col>
          </v-row>
          <div class="page-footer">{{ index + 1 }}</div>
        </div>
      </div>
        <!-- Ultima pagina -->
      <div class="page page-cover page-cover-bottom" data-density="hard">
        <div id="ultimaPagina">
          <div>
            {{ lista?.descricaoMst }}
            <p>Fim</p>
          </div>
        </div>
      </div>
    <!-- Imagem em tela cheia -->
      <ExpandirFoto 
        v-if="imgTelacheia"
        :valorModal="imgTelacheia"
        :produtoSelecionado="produtoSelecionado"
        :windowWidth="windowWidth"
        @update:valorModal="imgTelacheia = $event"
      />
      </div>
    <!-- Pesquisa de item -->
    <ExpandirPesquisa
      v-if="exibirPesquisa"
      :valorModal="exibirPesquisa"
      :filtroProdutos="filtroProdutos"
      @update:valorModal="exibirPesquisa = $event"
      @onSelect="onSelect"
    />
    <!-- Botões de navegação -->
    <BotoesDeNavegacao
      @onclickSumario="onclickSumario"
      @mostruario="mostruario"
      @pesquisa="pesquisa"
      @antPag="antPag"
      @proxPag="proxPag"
    />
    <!-- Sumario -->
    <Sumario
      v-if="exibirSumario"
      :valorModal="exibirSumario"
      :filtroProdutos="filtroProdutos"
      @update:valorModal="exibirSumario = $event"
      @selectPag="selectPag"
      
    />
  </div>
</template>

<script lang="ts" setup>
import { Produto } from '@/classes/produtosCatalogo'
import { PageFlip } from 'page-flip'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { getProdutos } from '@/services/getMostruarios'
// import { getProdutos } from '../services/getItens'
import { ListaProduto } from '@/classes/produtosCatalogo'
import Alerta from '@/components/Alert.vue'
import Sumario from '@/components/Sumario.vue'
import Descricao from '@/components/Descricao.vue'
import BotoesDeNavegacao from '@/components/BotoesDeNavegacao.vue'
import ExpandirPesquisa from '@/components/Pesquisa.vue'
import ExpandirFoto from '@/components/ExpandirFoto.vue'
import errorImg from '@/assets/images/erro-img.jpg'

interface RouteParams {
  id: string
}

const ativarPesquisa = ref(false)
const pageFlip = ref<PageFlip>()
const filtroProdutos = ref<Produto[]>([])
const lista = ref<ListaProduto | null>(null)
const imgTelacheia = ref(false)
const produtoSelecionado = ref<Produto>({} as Produto)
const windowWidth = ref(window.innerWidth)
const route = useRoute()
const router = useRouter()
const id = (route.params as RouteParams).id as string
const loading = ref<boolean>(false)
const imgErro = ref(false)
const imgCapa = ref<string>( // URL da imagem da capa do catálogo
  'https://www.tothmoveis.com.br/cdn/shop/articles/image-la-serena-nk-16686045534939.jpg?v=1701543567&width=1100')
// const imgCapa = ref<string>('https://dominio.com/nao-existe.jpg') // URL de exemplo que pode gerar erro

let exibirExpandirFoto = ref<boolean>(false)
let exibirDescricao = ref<boolean>(false)
let exibirSumario = ref<boolean>(false)
let exibirPesquisa = ref<boolean>(false)
let alert = ref<boolean>(false)
let mensagem = ''
let tituloErro = ''

const onclickSumario = () => {
  exibirSumario.value = true
}

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const exibirDetalhamento = (produto: any) => {
  filtroProdutos.value.forEach((p) => {
    p.mostrarDescricao = false
  })
  produto.mostrarDescricao = true
  exibirDescricao.value = true
}

const mostruario = () => {
  router.push('/')
}

const expandirImg = (produto: Produto) => {
  produtoSelecionado.value = produto
  imgTelacheia.value = true
}

const pesquisa = () => {
  exibirPesquisa.value = true
//ativarPesquisa.value = !ativarPesquisa.value
}

const onSelect = (produtoSelecionado: any) => {
  if (produtoSelecionado && produtoSelecionado.paginaDoProduto) {
    const pagina = produtoSelecionado.paginaDoProduto
    selectPag(pagina)
  }
}

const selectPag = (Pag: any) => {
  if (pageFlip.value) {
    pageFlip.value.turnToPage(Pag)
  }
}

const proxPag = () => {
  if (pageFlip.value) {
    pageFlip.value.flipNext()
  }
}

const antPag = () => {
  if (pageFlip.value) {
    pageFlip.value.turnToPrevPage()
  }
}

function concatenarDetalhe(item: any) {
  let cor = item.desCor == 'INDEFINIDA' ? '' : item.desCor
  let variacao = item.desVariacao == 'INDEFINIDA' ? '' : item.desVariacao
  let acabamento = item.desAcabamento == 'INDEFINIDO' ? '' : item.desAcabamento
  let descricaoConcatenada = ''

  descricaoConcatenada = cor ? ' - ' + cor : ''
  descricaoConcatenada = descricaoConcatenada + (variacao ? ' - ' + variacao : '')
  descricaoConcatenada = descricaoConcatenada + (acabamento ? ' - ' + acabamento : '')

  return descricaoConcatenada ? descricaoConcatenada.slice(2) : 'INDEFINIDO'
}

onMounted(async () => {
  try {
    loading.value = true
    alert.value = false

    const produtos = await getProdutos(id as unknown as number)
    lista.value = new ListaProduto(
      produtos.autoincMst,
      produtos.descricaoMst,
      produtos.codigoEmpresa,
      produtos.descricaoEmpresa,
      ordenarProdutos(produtos.produtos)
    )
    filtroProdutos.value = lista.value.produtos

    filtroProdutos.value.forEach((produto, index) => {
      produto.paginaDoProduto = Math.floor(index + 1)
    })

    filtroProdutos.value.forEach((produto) => {
      if (produto.detalhamentos && produto.detalhamentos.length > 0) {
        produto.detalhamentoSelecionado = produto.detalhamentos[0]
      }
    })

    if (filtroProdutos.value.length > 0) {
      produtoSelecionado.value = filtroProdutos.value[0]
    }
    
    filtroProdutos.value.forEach((produto, index) => {
      produto.paginaDoProduto = Math.floor(index + 1)
    })

    await nextTick()
    construirLivro()

    window.addEventListener('resize', construirLivro)
    window.addEventListener('resize', updateWindowWidth)
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
})

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

function construirLivro() {
  if (filtroProdutos.value.length === 0) {
    console.error('Filtro de produtos está vazio. Não é possível construir o livro.')
    return
  }

  const livroElemento = document.getElementById('book')
  if (!livroElemento) {
    console.error('Elemento #book não encontrado')
    return
  }

  pageFlip.value = new PageFlip(livroElemento, {
    width: window.innerWidth > 550 ? 550 : window.innerWidth * 0.9,
    height: window.innerHeight > 700 ? 700 : window.innerHeight * 0.8,

    minWidth: 200,
    maxWidth: 1000,
    minHeight: 320,
    maxHeight: 1350,

    maxShadowOpacity: -0.5, // Intensidade de meia sombra
    showCover: true,
    mobileScrollSupport: true, // Desabilitar rolagem de conteúdo em dispositivos móveis
    disableFlipByClick: true
  })

  const pages = document.querySelectorAll('.page') as NodeListOf<HTMLElement>
  if (pages.length === 0) throw 'Nenhuma página encontrada'

  pageFlip.value.loadFromHTML(pages)
}
</script>

<style>


@media (max-width: 600px) {
  .altura-fixa-select .v-input__control {
    min-height: 40px !important; /* Mesmo valor para celular */
  }
}

body {
  overflow-x: hidden;
}

#loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

#btnTelaCheia {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10;
}

#btnTelaDesc {
  margin-left: auto;
  margin-top: 0;
}

/* #Detalhecard {
  max-width: 100%;
  max-height: 100%;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  text-align: center;
} */

/* Fundo preto da img tela cheia */
#sheetTelaCheia {
  background-color: #00000067;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5) !important;
  display: flex;
  justify-content: center;
}

#ultimaPagina {
  font-size: 25px;
  text-align: center;
  color: #545454;
  font-weight: bold;
  margin-top: 50%;
  margin-bottom: 50%;
}

#text-sumario {
  font-size: 25px;
  text-align: center;
  color: #545454;
}

/* #btnTelaCard.v-btn {
    min-width: 40px !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 50% !important;
    padding: 0 !important;
} */

/* #opc-sumario {
  font-size: 11px;
  margin-top: -3%;
} */

/* #text-opc-sumario {
  white-space: normal;
  word-wrap: break-word;
  text-align: left;
} */

.altura-fixa-select .v-input__control {
  min-height: 40px !important;
}

#imgCheia {
  width: 90%;
}
/* #tituloCard {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1%;
    border-radius: 5px;
} */
@media (max-width: 500px) {
  .carousel-img {
    width: 95%;
    max-width: 100%;
    display: flex;
    margin: auto;
    flex: 1;
    height: auto;
    align-items: flex-start;
  }
  #ultimaPagina {
    font-size: 12px;
    text-align: center;
  }
  #sheetTelaCheia {
    margin-top: 100%;
    margin: 2%;
  }
  #botoesPagina {
    display: flex;
    justify-content: space-between; /* Distribui os botões horizontalmente */
    position: absolute;
    bottom: 25px;
    left: 0;
    height: 80px;
    right: 0;
    margin-top: 50px;
  }
  .page.page-cover h2 {
    text-align: center;
  }

  .altura-fixa-select .v-field {
    margin-top: 25px;
    min-height: 50px !important;
    height: 32px !important;
  }
}

@media (min-width: 501px) {
  .carousel-img {
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  #Detalhecard {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    width: 700px;
    margin: auto;
  }
  #botoesPagina {
    display: flex;
    justify-content: space-between; /* Distribui os botões horizontalmente */
    position: absolute;
    bottom: 25px;
    left: 0;
    height: 70px;
    right: 0;
    margin-top: 70px;
  }
  .page.page-cover h2 {
    text-align: center;
    font-size: 210%;
  }
}

v-img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.container {
  min-height: calc(100vh - 65px); /* 64px é a altura da barra */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (min-width: 769px) {
  .page {
    flex: 1 1 calc(50% - 16px); /* Ajusta para 50% em telas maiores */
  }
}

.capaCatalogo {
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
}

.btnInfo {
  margin-top: 1%;
}


.page img {
  width: 500%;
}

h3 {
  text-align: center;
}

#book {
  margin: 15px auto;
  box-shadow: 0 0 20px 0 rgba(208, 208, 208, 0.5) !important;
  display: block;
  background-size: cover !important;
  align-items: center;
  margin: 1px auto;

  height: 0vh;
  max-height: none;
  overflow: hidden;
}
.page {
  flex: 1 1 calc(100% - 16px); /* Ajusta para ocupar 100% em telas menores */
  margin: 16px auto; /* Centraliza horizontalmente */
  padding: 5px;
  background-color: hsl(0, 0%, 100%);
  color: hsl(0, 0%, 0%);
  border: solid 1px hsl(244, 25%, 79%);
  overflow: hidden;
}

.page .page-content .page-text {
  height: 100%;
  flex-grow: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 100%;
  text-align: justify;

  box-sizing: border-box;
}

.page .page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.page .page-content .page-header {
  height: 30px;
  font-size: 100%;
  text-transform: uppercase;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.page .page-content .page-image img {
  max-width: 100%;
  height: auto;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}

.page .page-content .page-footer {
  height: 30px;
  font-size: 80%;
  margin-bottom: 1%;
  margin-top: auto;
}

.page.--left {
  border-right: 0;
  box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
}

.page.--right {
  border-left: 0;
  box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);
}

.page.--right .page-content .page-footer {
  text-align: right;
}

.page.hard {
  background-color: hsl(245, 49%, 90%);
  border: solid 1px hsl(229, 20%, 50%);
}

.page.page-cover {
  background-color: hsl(0, 0%, 88%);
  color: hsl(0, 0%, 0%);
  border: solid 1px hsl(248, 12%, 73%);
}

.page.page-cover.page-cover-top {
  box-shadow: inset 0px 0 5px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(36, 10, 3, 0.5);
}

.page.page-cover.page-cover-bottom {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
}
</style>

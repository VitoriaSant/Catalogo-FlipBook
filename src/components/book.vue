<template >
  <div class="container" v-if="ocutarLivro === false">
    <!-- <span class="page-orientation">  </span> -->
    <div class="flip-book" id="book">
      <div class="page page-cover page-cover-top" data-density="hard">
        <div id="capaCatalogo">
          <h2>{{ props.descricaoCatalago }}</h2>
          <h3>{{ props.empresaDescricao }}</h3>
        </div>
      </div>
    </div>
    <div class="flip-book" id="book">
      <!-- Sumario -->
      <div class="page page-cover page-cover-top" data-density="hard">
        <div class="page" v-for="numPag in Math.ceil(filtroProdutos.length / 25)">
          <p id="text-sumario">Sumário</p>
          <p v-for="(produto, i) in filtroProdutos.slice((numPag - 1) * 25, numPag * 25)" :key="i">
            <v-btn
              id="opc-sumario"
              variant="plain"
              @click="
                selectPag(Math.ceil(filtroProdutos.length / 25) + 1 + produto.paginaDoProduto)
              "
            >
              <div id="text-opc-sumario">
                {{ (produto.paginaDoProduto = (numPag - 1) * 25 + i + 1) }} - {{ "Nome do Produto" }}
              </div>
            </v-btn>
          </p>
        </div>
      </div>
      <!-- Pagina de produtos -->
      <div class="page" v-for="(produto, index) in filtroProdutos">
        <div class="page-content">
          <h1 class="page-header">{{ "Nome do Produto" }}</h1>
          <!-- Imagem do Produto -->
          <div class="carousel-img">
            <v-carousel
              :height="windowWidth > 500 ? '540px' : '300px'" 
              show-arrows="hover"
              hide-delimiter-background
              width="100%"
            >
              
                <v-carousel-item 
                  v-for="(detalhe, imgId) in produto.detalhamentoSelecionado?.imagens"
                  :key="imgId"
                >
                  <v-sheet height="100%">
                    <div>
                      <v-img class="bg-grey-lighten-2" :src="detalhe.url" />
                    </div>
                  </v-sheet>
                </v-carousel-item>
              
            </v-carousel>
          </div>
          <v-row id="botoesPagina">
            <!-- Seleçao de detalhamento -->
            <v-col cols="8" class="d-flex">              
                <v-select
                  class="w-100"
                  size="small"
                  label="Detalhamento"
                  :items="produto.detalhamento"
                  :item-title="(item) => concatenarDetalhe(item)"
                  :return-object="true"
                  v-model="produto.detalhamentoSelecionado"
                >
                </v-select>
            </v-col>
            <!-- Botão de descricao do produto -->
            
            <v-col cols="2" class="d-flex justify-center btnInfo" >
              <div>
                <!-- Descricao do produto -->
                <v-btn icon="mdi-exclamation-thick" @click="exibirDetalhamento(produto)"></v-btn>                    
                    <v-dialog v-model="produto.mostrarDetalhamento">
                      <v-card id="cardDescricaoProduto">
                        <v-btn id="btnTelaCheia" icon="mdi-close" @click="produto.mostrarDetalhamento = false"></v-btn>
                        {{ "Nome do Produto" }}
                        <br />
                        {{ produto.descricao }}
                        <template v-if="produto.colecao !== 'INDEFINIDA'">
                          <br />
                          Coleção: {{ produto.colecao }}
                        </template>
                        <template v-if="produto.linha !== 'INDEFINIDA'">
                          <br />
                          Linha: {{ produto.linha }}
                        </template>
                        <template v-if="produto.grupo !== 'INDEFINIDO'">
                          <br />
                          Grupo: {{ produto.grupo }}
                        </template>
                        <template
                          v-if="
                            produto.altura !== 0 || produto.largura !== 0 || produto.comprimento !== 0
                          "
                        >
                          <br />
                          Altura: {{ produto.altura }} | Largura: {{ produto.largura }} | Comprimento:
                          {{ produto.comprimento }}
                        </template>
                        <template v-if="produto.pesoBruto !== 0 || produto.pesoLiquido !== 0">
                          <br />
                          Preço Bruto: {{ produto.pesoBruto }} | Peso Liquido: {{ produto.pesoLiquido }}
                        </template>
                      </v-card>
                    </v-dialog>
                
              </div>
            </v-col>
            <!-- Expandir imagem -->
            <v-col cols="2" class="d-flex justify-center btnInfo">
              <div>
                <v-btn icon="mdi-magnify-expand" @click="expandirImg(produto)"></v-btn> 
              </div>
            </v-col>
          </v-row>
          <div class="page-footer">{{ index + 1 }}</div>
        </div> 
        <!-- Imagem em tela cheia             -->
        <v-dialog v-model="imgTelacheia" fullscreen>
          <template v-if="produtoSelecionado">
            
            <v-carousel
              :height="windowWidth > 768 ? '540px' : '300px'"
              show-arrows="hover"
              hide-delimiter-background
              width="100%"
            >
              <v-carousel-item
                v-for="(detalhe, imgId) in produtoSelecionado.detalhamentoSelecionado?.imagens"
                :key="imgId"
              >
              <div><v-btn icon="mdi-close" @click="imgTelacheia = false" id="btnTelaCheia"></v-btn></div>
                <v-sheet
                  class="d-flex align-center justify-center"
                  id ="sheetTelaCheia"
                  height="100%"
                >  
                  <img
                    :src="detalhe.url"
                    alt="Imagem do produto"
                  />
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </template>
        </v-dialog>
      </div>
      <!-- Ultima pagina -->
      <div v-if="mostrarCapa" class="page page-cover page-cover-bottom" data-density="hard">
        <div id="ultimaPagina">
          <div id="tituloCatalogo">{{ props.descricaoCatalago }}</div>
          Obrigado por explorar nosso Catálogo de Verão!
          <br />
          Esperamos que tenha encontrado as peças perfeitas para transformar seus espaços nesta
          estação. Combinando sofisticação, conforto e praticidade, nossos móveis foram pensados
          para oferecer a melhor experiência durante os dias mais quentes do ano. Se precisar de
          mais informações ou quiser saber mais sobre como nossos produtos podem se encaixar no seu
          ambiente, nossa equipe está à disposição para ajudar. Aproveite o verão com estilo e
          conforto – porque cada momento merece ser vivido ao máximo!
          <br /><br />
          <div id="contato">
            Empresa: {{ props.empresaDescricao }}
            <br />
            Telefone: (11) 9999-9999
            <br />
          </div>
        </div>
      </div>
    </div>
    <!-- Pesquisa de item -->
    <v-dialog id="PesquisaItem" v-model="ativarPesquisa">
      <v-card>
        <v-autocomplete
          id="autocomplete"
          label="Pesquisa"
          clearable
          :items="filtroProdutos"
          item-title="nome"
          v-model="(filtroProdutos as any).paginaDoProduto"
          :return-object="true"
          @update:modelValue="onSelect"
        >
        </v-autocomplete>
        <v-btn @click="pesquisa">Fechar Pesquisa</v-btn>
      </v-card>
    </v-dialog>
    <!-- Botões de navegação -->
    <v-row id="todosBotoesDeNavegacao" >
      <v-col class="d-flex justify-end">
        <v-btn icon="mdi-arrow-left-bold" v-tooltip="'Página anterior'" @click="antPag"></v-btn>
      </v-col>
      <v-col class="d-flex justify-center" id="botoesDeNavegacaoCentral">
        <v-btn icon="mdi-home-outline" v-tooltip="'Mostruários'" @click="mostruario"></v-btn>
        <v-btn icon="mdi-format-list-numbered-rtl" v-tooltip="'Sumário'" @click="selectPag(2)"></v-btn>
        <v-btn icon="mdi-magnify" v-tooltip="'Pesquisa'" @click="pesquisa"></v-btn>
      </v-col>
      <v-col class="d-flex justify-start" v-tooltip="'Próxima página'" @click="proxPag">
        <v-btn icon="mdi-arrow-right-bold"></v-btn>
      </v-col>
    </v-row>
  </div>
  <!-- Abrir mostruario -->
  <div v-if="listarMostruarios">
    <index />
  </div>
</template>

<script lang="ts" setup>
import { Produto } from '@/classes/produtosCatalogo'
import { PageFlip } from 'page-flip'
import index from '@/pages/index.vue'

const props = defineProps<{ catalogo: number; descricaoCatalago: string; empresa: number; empresaDescricao: string; produtos: Produto[] }>()
const mostrarCapa = ref(true)
const pageFlip = ref<PageFlip>()

const filtroProdutos = ref<Produto[]>(props.produtos)
const ativarPesquisa = ref(false)
const imgTelacheia = ref(false)
const listarMostruarios = ref<boolean>(false)
const ocutarLivro = ref<boolean>(false)
const produtoSelecionado = ref<Produto>({} as Produto)
//const descDetalhe = ref<boolean>(false)
const windowWidth = ref(window.innerWidth);


const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const exibirDetalhamento = (produto: any) => { 
  filtroProdutos.value.forEach((p) => {
    p.mostrarDetalhamento = false; // Fecha todos os outros diálogos
  });
  produto.mostrarDetalhamento = true; // Abre o diálogo apenas para o produto clicado
}

const mostruario = () => {
  listarMostruarios.value = true
  ocutarLivro.value = true 
}

const expandirImg = (produto:any) => {
  produtoSelecionado.value = produto
  imgTelacheia.value = true
}

const pesquisa = () => {
  ativarPesquisa.value = !ativarPesquisa.value
}

const onSelect = (produtoSelecionado: any) => {
  if (produtoSelecionado && produtoSelecionado.paginaDoProduto) {
    const totalPaginas = Math.ceil(filtroProdutos.value.length / 25) + 1
    const pagina = produtoSelecionado.paginaDoProduto + totalPaginas
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
    pageFlip.value.turnToNextPage()
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

onMounted(() => {
  construirLivro()
  window.addEventListener('resize', construirLivro);
  window.addEventListener('resize', updateWindowWidth);
})

function construirLivro() {
  const livroElemento = document.getElementById('book')
  if (!livroElemento) return

  // largura = window.innerWidth > 1024 ? 550 : window.innerWidth * 0.9; // Fixa em 550px para telas maiores
  //const altura = window.innerWidth > 1024 ? 700 : window.innerHeight * 0.9; // Fixa em 700px para telas maiores

  pageFlip.value = new PageFlip(livroElemento, {
    //width: 550, // Largura da página base
    //height: 700, // Altura da página base
    width: window.innerWidth > 550 ? 550 : window.innerWidth * 0.9,
    height: window.innerHeight > 700 ? 700 : window.innerHeight * 0.8,
    
    // Define valores limite:
    //width: largura, // Ajusta a largura dinamicamente
    //height: altura, // Ajusta a altura dinamicamente
    minWidth: 315,
    maxWidth: 1000,
    minHeight: 420,
    maxHeight: 1350,

    maxShadowOpacity: -0.5, // Intensidade de meia sombra
    showCover: true,
    mobileScrollSupport: true, // Desabilitar rolagem de conteúdo em dispositivos móveis
    disableFlipByClick: true,

  })

  const pages = document.querySelectorAll('.page') as NodeListOf<HTMLElement>
  if (pages.length === 0) throw 'Nenhuma página encontrada'

  pageFlip.value.loadFromHTML(pages)

  // Identifica o momento que o evento fold_corner acontece
  if (pageFlip.value) {
    pageFlip.value.on('changeState', (state) => {
      if (state.data === 'fold_corner') {
        console.log('Evento de dobrar canto da página')
        //state.preventDefault?.();
        return;
      }
    })
  }
}

</script>

<style>
body {
  overflow-x: hidden;
}

#btnTelaCheia{
  position: fixed; 
  top: 10px; 
  right: 10px; 
  z-index: 10;
}
#cardDescricaoProduto{
  max-width: 100%;
  max-height: 100%;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Sombra para destacar o card */
}

/* #ImgExpandida {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
} */

/* Fundo preto da img tela cheia */
#sheetTelaCheia {
  background-color: #00000067;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5) !important;
}

#botoesDeNavegacaoCentral {
  gap: 6px; /* Espaçamento entre os botões */
}
#todosBotoesDeNavegacao{
  position: fixed; /* Fixa os botões na parte inferior da tela */
  bottom: 0; /* Distância do final da página */
  left: 0;
  right: 0;
  margin-bottom: 1px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Sombra para destacar os botões */
}

#botoesPagina {
  display: flex;
  justify-content: space-between; /* Distribui os botões horizontalmente */
  position: absolute; /* Posiciona os botões em relação ao contêiner pai */
  bottom: 20px; /* Define a distância do final da página */
  left: 0;
  right: 0;
  padding: 20px; /* Adiciona espaçamento lateral */
  
}

#ultimaPagina {
  font-size: 15px;
  text-align: center;
}

#contato {
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 50px;
}

#tituloCatalogo {
  font-size: 25px;
}

#text-sumario {
  font-size: 25px;
  text-align: center;
  color: #545454;
}

#opc-sumario {
  font-size: 11px;
  margin-top: -3%;
}

#text-opc-sumario {
  white-space: normal;
  word-wrap: break-word;
  text-align: left;
}

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
#ultimaPagina{
  font-size: 12px;
  text-align: center;
}
}

@media (min-width: 501px) {
  .carousel-img {
    width: 95%; /* Ajusta a largura para 80% */
    max-width: 1200px; /* Define um limite máximo de largura */
    margin: 0 auto; /* Centraliza horizontalmente */
    display: flex;
    align-items: flex-start; /* Alinha o conteúdo ao topo */
    justify-content: center; /* Centraliza horizontalmente o conteúdo */

  }}


v-sheet > div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  gap: 16px;
}

.page {
  flex: 1 1 calc(100% - 16px); /* Ajusta para ocupar 100% em telas menores */
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

.select-detalhe {
  margin-top: 3%;
}

.page img {
  width: 500%;
}

.page.page-cover h2 {
  text-align: center;
  padding-top: 50%;
  font-size: 210%;
}

h3 {
  text-align: center;
}


/* Padrão BOOK INICIO*/
#book {
  margin: 15px auto;
  box-shadow: 0 0 20px 0 rgba(208, 208, 208, 0.5) !important;
  display: block;
  background-size: cover !important;
 
  height: 0vh; 
  max-height: none;
  overflow: hidden; 
}
.page {
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
  height: auto;;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}

.page .page-content .page-footer {
  height: 30px;
  border-top: solid 1px hsl(248, 57%, 90%);
  font-size: 80%;
  color: hsl(251, 20%, 50%);
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
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(36, 10, 3, 0.5);
}

.page.page-cover.page-cover-bottom {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
}
/* Padrão BOOK FIM*/
</style>

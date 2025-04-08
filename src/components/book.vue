<template >
  <div class="container" v-if="ocutarLivro === false">
    <!-- <span class="page-orientation">  </span> -->
    <div class="flip-book" style="background-color: blueviolet; padding-top: -100px;" id="demoBookExample">
      <div class="page page-cover page-cover-top" data-density="hard">
        <div>
          <h2>{{ title }}</h2>
        </div>
      </div>
    </div>
    <div class="flip-book" id="demoBookExample">
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
                {{ (produto.paginaDoProduto = (numPag - 1) * 25 + i + 1) }} - {{ produto.nome }}
              </div>
            </v-btn>
          </p>
        </div>
      </div>
      <!-- Pagina de produtos -->
      <div class="page" v-for="(produto, index) in filtroProdutos">
        <div class="page-content">
          <h1 class="page-header">{{ produto.nome }}</h1>
          <div class="carousel-img">
            <v-carousel height="500" show-arrows="hover" hide-delimiter-background width="100%">
              <div>
                <v-carousel-item
                  v-for="(detalhe, imgId) in produto.detalhamentoSelecionado?.imagens"
                  :key="imgId"
                >
                  <v-sheet height="100%">
                    <div>
                      <v-img class="bg-grey-lighten-2" height="500" :src="detalhe.url" />
                    </div>
                  </v-sheet>
                </v-carousel-item>
              </div>
            </v-carousel>
          </div>
          <v-row>
            <!-- Seleçao de detalhamento -->
            <v-col class="d-flex justify-end" lg="10">
              <div class="select-detalhe">
                <v-select
                  density="compact"
                  label="Detalhamento"
                  min-width="360"
                  :items="produto.detalhamento"
                  :item-title="(item) => concatenarDetalhe(item)"
                  :return-object="true"
                  v-model="produto.detalhamentoSelecionado"
                >
                </v-select>
              </div>
            </v-col>
            <!-- Botão de descricao do produto -->
            <v-col class="d-flex justify-center btnInfo" lg="1">
              <div>
                <!-- Descricao do produto -->
                <v-btn icon>
                  <v-tooltip id="idTooltip" activator="parent" location="top">
                    {{ produto.nome }}
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
                  </v-tooltip>
                  <v-icon>mdi-exclamation-thick</v-icon>
                </v-btn>
              </div>
            </v-col>
            <!-- Expandir imagem -->
            <v-col class="d-flex justify-center btnInfo" lg="1">
              <div>
                <v-btn icon="mdi-magnify-expand" @click="expandirImg"></v-btn>
              </div>
              <v-dialog v-model="imgTelacheia">
                <!-- Aqui a foto é trocada -->
                <v-card>
                  <div class="carousel-img">
                    <v-carousel
                      height="500"
                      show-arrows="hover"
                      hide-delimiter-background
                      width="100%"
                    >
                      <div>
                        <v-carousel-item
                          v-for="(detalhe, imgId) in produto.detalhamentoSelecionado?.imagens"
                          :key="imgId"
                        >
                          <v-sheet height="100%">
                            <div>
                              <span> {{ produto }} </span>
                              <v-img class="bg-grey-lighten-2" height="500" :src="detalhe.url" />
                            </div>
                          </v-sheet>
                        </v-carousel-item>
                      </div>
                    </v-carousel>
                  </div>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <div class="page-footer">{{ index + 1 }}</div>
        </div>
      </div>
      <!-- Ultima pagina -->
      <div v-if="mostrarCapa" class="page page-cover page-cover-bottom" data-density="hard">
        <div id="ultimaPagina">
          <div id="tituloCatalogo">Catalogo de Verão</div>
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
            Empresa: {{ title }}
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
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn icon="mdi-arrow-left-bold" v-tooltip="'Página anterior'" @click="antPag"></v-btn>
      </v-col>
      <v-col class="d-flex justify-center" id="botoesDeNavegacao">
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

const mostruario = () => {
  listarMostruarios.value = true
  ocutarLivro.value = true 
}

const expandirImg = () => {
  imgTelacheia.value = !imgTelacheia.value
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
})

function construirLivro() {
  const livroElemento = document.getElementById('demoBookExample')
  if (!livroElemento) return

  pageFlip.value = new PageFlip(livroElemento, {
    width: 550, // Largura da página base
    height: 700, // Altura da página base

    // Define valores limite:
    minWidth: 315,
    maxWidth: 1000,
    minHeight: 420,
    maxHeight: 1350,

    maxShadowOpacity: -0.5, // Intensidade de meia sombra
    showCover: true,
    mobileScrollSupport: true, // Desabilitar rolagem de conteúdo em dispositivos móveis
    disableFlipByClick: true
  })

  const pages = document.querySelectorAll('.page') as NodeListOf<HTMLElement>
  if (pages.length === 0) throw 'Nenhuma página encontrada'

  pageFlip.value.loadFromHTML(pages)

  // Identifica o momento que o evento fold_corner acontece
  if (pageFlip.value) {
    pageFlip.value.on('changeState', (state) => {
      if (state.data === 'fold_corner') {
        console.log('Evento de dobrar canto da página')
        
        return;
      }
    })
  }
}
</script>

<style>
#botoesDeNavegacao {
  gap: 10px;
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
#idTooltip {
  border-radius: 8px; /* Borda arredondada */
  text-align: center;
}

#PesquisaItem {
  width: 600px;
}

#demoBookExample {
  margin: 15px auto;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5) !important;
  display: none;
  background-size: cover !important;
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


.btnInfo {
  margin-top: 1%;
}

.text-medidas {
  height: 1px;
  background-color: #333;
  width: 90%;
  margin-top: 2%;
  font-size: 120%;
  position: fixed;
}

.text-interno-medidas {
  margin-top: 2%;
}

.carousel-img {
  margin-top: 5%;
}

.select-detalhe {
  margin-top: 3%;
}

.page {
  padding: 20px;
  background-color: hsl(0, 0%, 100%);
  color: hsl(0, 0%, 0%);
  border: solid 1px hsl(244, 25%, 79%);
  overflow: hidden;
  

  } 

.page img {
  width: 500px;
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
  justify-content: space-between;
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
  height: 100%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}

.page .page-content .page-footer {
  height: 30px;
  border-top: solid 1px hsl(248, 57%, 90%);
  font-size: 80%;
  color: hsl(251, 20%, 50%);
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

.page.page-cover h2 {
  text-align: center;
  padding-top: 50%;
  font-size: 210%;
}

.page.page-cover.page-cover-top {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(36, 10, 3, 0.5);
}

.page.page-cover.page-cover-bottom {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
}
</style>

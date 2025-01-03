interface Imagem {
  ordem: number
  tamanho: number
  url: string
}

export interface Detalhamento {
  acabamento: string
  cor: number
  desAcabamento: string
  desCor: string
  desVariacao: string
  imagens: Imagem[]
}

export class Produto {
  altura: number
  colecao: string
  comprimento: number
  nome: string
  descricao: string
  detalhamento: Detalhamento[]
  grupo: string
  item: string
  largura: number
  linha: string
  pesoBruto: number
  pesoLiquido: number
  subGrupo: string
  tipoProduto: string
  unidade: string

  // Propriedade para os componentes
  detalhamentoSelecionado?: Detalhamento
  paginaDoProduto?: number

  constructor(pObjeto: Produto) {
    this.altura = pObjeto.altura
    this.colecao = pObjeto.colecao
    this.comprimento = pObjeto.comprimento
    this.nome = pObjeto.nome
    this.descricao = pObjeto.descricao
    this.detalhamento = pObjeto.detalhamento ?? []
    this.grupo = pObjeto.grupo
    this.item = pObjeto.item
    this.largura = pObjeto.largura
    this.linha = pObjeto.linha
    this.pesoBruto = pObjeto.pesoBruto
    this.pesoLiquido = pObjeto.pesoLiquido
    this.subGrupo = pObjeto.subGrupo
    this.tipoProduto = pObjeto.tipoProduto
    this.unidade = pObjeto.unidade

    this.paginaDoProduto = 0

    if (this.detalhamento && this.detalhamento.length > 0) {
      this.detalhamentoSelecionado = pObjeto.detalhamento[0] // Assumindo que a primeira imagem seja a padrão
    }
  }
}

export class ListaProduto {
  empresa: string = ''
  produtos: Produto[] = []

  constructor(pEmpresa: string, pProdutos: Produto[] = []) {
    this.empresa = pEmpresa
    this.produtos = pProdutos
  }
}

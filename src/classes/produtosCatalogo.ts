interface Imagem {
  url: string
  tamanho: number
  // ordem: number
}

export interface Detalhamento {
  sku: string
  descricao: string
  detalhamento: string
  variacao: number
  desVariacao: string
  cor: number
  desCor: string
  acabamento: string
  desAcabamento: string
  imagens: Imagem[]
}

export interface Videos {}

export class Produto {
  item: number
  descricao: string
  descricaoResumida: string
  tipoProduto: string
  unidade: string
  colecao: string
  linha: string
  grupo: string
  subGrupo: string
  comprimento: number
  largura: number
  altura: number
  pesoBruto: number
  pesoLiquido: number
  videos: Videos[]

  detalhamentos: Detalhamento[]

  // Propriedade para os componentes
  detalhamentoSelecionado?: Detalhamento
  paginaDoProduto?: number
  mostrarDetalhamento?: boolean

  constructor(pObjeto: Produto) {
    this.item = pObjeto.item
    this.descricaoResumida = pObjeto.descricaoResumida
    this.descricao = pObjeto.descricao
    this.tipoProduto = pObjeto.tipoProduto
    this.unidade = pObjeto.unidade
    this.colecao = pObjeto.colecao
    this.linha = pObjeto.linha
    this.grupo = pObjeto.grupo
    this.subGrupo = pObjeto.subGrupo
    this.comprimento = pObjeto.comprimento
    this.largura = pObjeto.largura
    this.altura = pObjeto.altura
    this.pesoBruto = pObjeto.pesoBruto
    this.pesoLiquido = pObjeto.pesoLiquido
    this.videos = pObjeto.videos ?? []

    this.detalhamentos = (pObjeto.detalhamentos ?? []).map((det: any) => ({
      sku: det.sku,
      descricao: det.descricao,
      detalhamento: det.detalhamento,
      variacao: det.codigoVariacao,
      desVariacao: det.descricaoVariacao,
      cor: det.codigoCor,
      desCor: det.descricaoCor,
      acabamento: det.codigoAcabamento,
      desAcabamento: det.descricaoAcabamento,
      imagens: det.imagens ?? []
    }));

    this.paginaDoProduto = 0
    this.mostrarDetalhamento = false

  }
}

export class ListaProduto {
  autoincMst: number
  descricaoMst: string = ''
  codigoEmpresa: number
  descricaoEmpresa: string = ''

  produtos: Produto[] = []

  constructor(
    pAutoincMst: number,
    pDescricaoMst: string,
    pCodigoEmpresa: number,
    pDescricaoEmpresa: string,
    pProdutos: Produto[] = []
  ) {
    this.autoincMst = pAutoincMst
    this.descricaoMst = pDescricaoMst
    this.codigoEmpresa = pCodigoEmpresa
    this.descricaoEmpresa = pDescricaoEmpresa
    this.produtos = pProdutos
  }
}

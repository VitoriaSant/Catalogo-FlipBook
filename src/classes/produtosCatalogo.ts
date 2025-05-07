interface Imagem {
    url: string
    tamanho: number
    // ordem: number
}

export interface Detalhamento {
    sku: string
    descricaoCompleta: string
    variacao: number
    desVariacao: string
    cor: number
    desCor: string
    acabamento: string
    desAcabamento: string  
    imagens: Imagem[]
}

export interface Videos{}

export class Produto {
    item: number
    //nome: string
    descricao: string
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
    
    detalhamento: Detalhamento[]
    
    // Propriedade para os componentes
    detalhamentoSelecionado?: Detalhamento
    paginaDoProduto?: number
    mostrarDetalhamento?: boolean

    constructor(pObjeto: Produto) {
        this.item = pObjeto.item
        //this.nome = pObjeto.nome
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
        this.detalhamento = pObjeto.detalhamento ?? []

        this.paginaDoProduto = 0
        this.mostrarDetalhamento = false

        if (this.detalhamento && this.detalhamento.length > 0) {
            this.detalhamentoSelecionado = pObjeto.detalhamento[0] // Assumindo que a primeira imagem seja a padrão
        }
    }
}

export class ListaProduto {
    catalogo: number
    descricaoCatalago: string = ''
    empresa:number
    empresaDescricao: string = ''

    produtos: Produto[] = []

    constructor(pCatalogo:number,
        pDescricaoCatalago: string, 
        pEmpresa: number,
        pEmpresaDescricao:string, 
        pProdutos: Produto[] = []) {
        this.catalogo = pCatalogo
        this.descricaoCatalago = pDescricaoCatalago
        this.empresa = pEmpresa
        this.empresaDescricao = pEmpresaDescricao
        this.produtos = pProdutos
    }
}

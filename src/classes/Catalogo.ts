export class Catalogo {
    catalogo: number
    descricaoCatalago: string

    constructor(pObjeto: Catalogo) {
        this.catalogo = pObjeto.catalogo
        this.descricaoCatalago = pObjeto.descricaoCatalago
    }    
}

export class ListaCatalogos {
    catalogos: Catalogo[] = []

    constructor(pCatalogos: Catalogo[] = []) {
        this.catalogos = pCatalogos
    }
}
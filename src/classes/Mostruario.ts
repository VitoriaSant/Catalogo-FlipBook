export class Mostruario {
    autoincMst: number
    descricaoMst: string
    ordemMst: string

    constructor(pObjeto: Mostruario) {
        this.autoincMst = pObjeto.autoincMst
        this.descricaoMst = pObjeto.descricaoMst
        this.ordemMst = pObjeto.ordemMst
    }
}

export class ListaMostruario {
    autoincMst: number
    descricaoMst: string = ''
    ordemMst: string = ''

    constructor(pObjeto: ListaMostruario) {
        this.autoincMst = pObjeto.autoincMst
        this.descricaoMst = pObjeto.descricaoMst
        this.ordemMst = pObjeto.ordemMst
    }
}
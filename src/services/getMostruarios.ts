import { ListaProduto, Produto } from '@/classes/ProdutosCatalogo'
import { api } from '@/services/api'
import caminho from '@/../shared/constant'

interface ListaResposta {
  mostruario: any[]
}

export interface IResponseGetProdutos {
  autoincMst: number
  descricaoMst: string
  codigoEmpresa: number
  descricaoEmpresa: string
  itens: any[]
}

export async function GetMostruarios() {
  try {
    const { data } = await api.get<ListaResposta>(caminho + '/mostruario/disponiveis')
    return data
  } catch (error) {
    throw {
      error
    }
  }
}

export async function GetProdutos(idMostruario: number): Promise<ListaProduto> {
  try {
    const { data } = await api<IResponseGetProdutos>({
      method: 'GET',
      url: `${caminho}/mostruario/${idMostruario}/itens?apenasItensComImagens=${idMostruario}`
    })
    const lista = new ListaProduto(
      data.autoincMst,
      data.descricaoMst,
      data.codigoEmpresa,
      data.descricaoEmpresa,
      []
    )
    for (const registro of data.itens) {
      lista.produtos.push(new Produto(registro))
    }
    return lista
  } catch (error) {
      throw error
  }
}

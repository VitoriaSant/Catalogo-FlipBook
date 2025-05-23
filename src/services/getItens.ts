import { ListaProduto, Produto } from '@/classes/produtosCatalogo'
import { api } from '@/services/api'

interface ApiError {
  idError: string
  messageError: string
  error: unknown
}

export interface IResponseGetProdutos {
  autoincMst: number
  descricaoMst: string
  codigoEmpresa: number
  descricaoEmpresa: string
  itens: any[]
}

export async function getProdutos(idMostruario: number): Promise<ListaProduto> {
  try {
    const { data } = await api<IResponseGetProdutos>({
      method: 'GET',
      url: `${
        import.meta.env.VITE_PRODUTOS_MOSTRUARIOS
      }/${idMostruario}/itens?apenasItensComImagens=${idMostruario}`
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
    throw {
      idError: 'ERR_GET_PRODUCT',
      messageError: 'Falha na busca de Produtos da API',
      error
    } as ApiError
  }
}

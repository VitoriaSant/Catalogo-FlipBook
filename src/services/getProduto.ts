import { ListaProduto, Produto } from '@/classes/produto'
import { api } from '@/services/api'

interface ApiError {
  idError: string
  messageError: string
  error: unknown
}

export interface IResponseGetProdutos {
  titulo: string
  itens: any[]
}

export async function getProdutos(token: string): Promise<ListaProduto> {
  try {
    const { data } = await api<IResponseGetProdutos>({
      method: 'GET',
      url: `${import.meta.env.VITE_API_URL}?UnitEMetodo=CATALOGO&Body=0`,
      headers: { Authorization: `Bearer ${token}` }
    })

    const lista = new ListaProduto('', [])
    lista.empresa = data.titulo

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

import { Catalogo, ListaCatalogos } from '@/classes/catalogo'
import { api } from '@/services/api'

interface ListaResposta {
  catalogos: any[]
}
interface listaError {
  idError: string
  messageError: string
  error: unknown
}
export async function getMostruarios(): Promise<ListaCatalogos> {
  try {
    const { data } = await api.get<ListaResposta>(import.meta.env.VITE_LISTAR_MOSTRUARIOS)
    const listaCat = new ListaCatalogos([])
    for (const registro of data.catalogos) {
      listaCat.catalogos.push(new Catalogo(registro))
    }
    console.log('Lista de catálogos:', listaCat.catalogos)
    return listaCat
  } catch (error) {
    console.error('Erro ao listar catálogos:', error)
    throw {
      idError: 'ERR_AUTH',
      messageError: 'Falha na listagem dos catálogos',
      error
    } as listaError
  }
}

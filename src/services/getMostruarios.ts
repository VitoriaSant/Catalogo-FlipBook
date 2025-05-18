import { api } from '@/services/api'

interface ListaResposta {
  catalogos: any[]
}
interface listaError {
  idError: string
  messageError: string
  error: unknown
}
export async function getMostruarios(){
  try {
    const { data } = await api.get<ListaResposta>(import.meta.env.VITE_LISTAR_MOSTRUARIOS)
    if (data.length === 0) {
      throw {
        idError: 'ERR_VOID',
        messageError: 'Nenhum catálogo encontrado'
      } as listaError
    }
    return data
  } catch (error) {
    if (error.idError === 'ERR_VOID') {
      throw{
        idError: error.idError,
        messageError: error.messageError,
        error
      } 
    }else {
      throw {	
        idError: 'ERR_AUTH',
        messageError: 'Falha na listagem dos catálogos',
        error
      } as listaError
    }
    
  }
}

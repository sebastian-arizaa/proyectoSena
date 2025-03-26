import axios from 'axios'
import { useEffect, useState } from 'react'
import { Formacion} from '../types'


interface Props {
  currentMunicipio: string
  municipios: string[]
}

export function useFetchFormaciones({currentMunicipio, municipios}: Props) {
  const [formaciones, setFormaciones] = useState<Formacion[]>([])
  const [formacionesFiltradas, setFormacionesFiltradas] = useState<Formacion[]>([])

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(()=> {
    if(currentMunicipio) {
      const getFormaciones = async() => {
        const {data} = await axios(`${API_URL}/formaciones/por-municipio/${currentMunicipio}`)
        if(data.length) {
          setFormaciones(data)
          setFormacionesFiltradas(data)
          console.log('🚀 ~ getFormaciones ~ data:', data)
        }
      }
      getFormaciones()
    }
  }, [currentMunicipio])

  useEffect(()=> {
    if(!municipios.length) {
      setFormaciones([])
      setFormacionesFiltradas([])
    }
  }, [municipios])

  return {formaciones, formacionesFiltradas, setFormacionesFiltradas, setFormaciones}
}

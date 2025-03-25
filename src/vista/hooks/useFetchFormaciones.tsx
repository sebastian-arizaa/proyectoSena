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

  useEffect(()=> {
    if(currentMunicipio) {
      const getFormaciones = async() => {
        const {data} = await axios(`http://localhost:3000/formaciones/por-municipio/${currentMunicipio}`)
        setFormaciones(data)
        setFormacionesFiltradas(data)
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

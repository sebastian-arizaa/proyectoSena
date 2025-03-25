import axios from 'axios'
import { useEffect, useState } from 'react'
import { Formacion, Sede } from '../types'

interface Props {
  currentSede: Sede  | null
  sedes: Sede[]
}

export function useFetchFormaciones({currentSede, municipios}: Props) {
  const [formaciones, setFormaciones] = useState<Formacion[]>([])
  const [formacionesFiltradas, setFormacionesFiltradas] = useState<Formacion[]>([])

  useEffect(()=> {
    if(currentSede) {
      const getFormaciones = async() => {
        const {data} = await axios(`http://localhost:3000/formaciones/por-municipio/${currentSede.numeroIdentificacion}`)
        setFormaciones(data)
        setFormacionesFiltradas(data)
      }
      getFormaciones()
    }
  }, [currentSede])

  useEffect(()=> {
    if(!municipios.length) {
      setFormaciones([])
      setFormacionesFiltradas([])
    }
  }, [municipios])

  return {formaciones, formacionesFiltradas, setFormacionesFiltradas, setFormaciones}
}

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Sede } from '../types'

interface Props {
  currentDepartamento: string
}

export function useFetchSedes({currentDepartamento}: Props) {
  const [sedes, setSedes] = useState<Sede[]>([])
  console.log('RENDERIZA ESTE FECTH CDE USE FETCHESSS =>', currentDepartamento)
  useEffect(()=> {
    if(currentDepartamento) {
      const getSedes = async () => {
        const {data} = await axios<Sede[]>(`http://localhost:3000/sedes/por-departamento/${currentDepartamento}`)
        setSedes(data)
      }
      getSedes()
    }
  }, [currentDepartamento])

  return [sedes]
}

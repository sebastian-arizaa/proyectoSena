import { useEffect, useState } from 'react'
import axios from 'axios'
import { Sede, Tipo } from '../types'

interface Props {
  currentDepartamento: string,
  tipo?: Tipo
}

export function useFetchSedes({currentDepartamento, tipo=''}: Props) {
  const [sedes, setSedes] = useState<Sede[]>([])
  // console.log('RENDERIZA ESTE FECTH CDE USE FETCHESSS =>', currentDepartamento)
  useEffect(()=> {
    console.log('EL TIPO QUE LLEGOOOOOOOOOO: ', tipo)
    if(currentDepartamento && tipo != 'Departamento') {
      const getSedes = async () => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@hace fetch de sedes >@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        const {data} = await axios<Sede[]>(`http://localhost:3000/sedes/por-departamento/${currentDepartamento}`)
        setSedes(data)
      }
      getSedes()
    }
  }, [currentDepartamento])

  return {sedes, setSedes}
}

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Tipo } from '../types'

interface Props {
  currentDepartamento: string,
  tipo?: Tipo
}

export function useFetchMunicipio({currentDepartamento, tipo=''}: Props) {
  const [municipios, setMunicipio] = useState<string[]>([])
  useEffect(()=> {
    if(currentDepartamento && tipo != 'Departamento') {
      const getMunicipio = async () => {
        const {data} = await axios<{municipio: string}[]>(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${currentDepartamento}`)
        const values = data.map(data => data.municipio).sort((a,b) => (a.charCodeAt(0) as number) - (b.charCodeAt(0) as number))
        setMunicipio(values)
      }
      getMunicipio()
    }
  }, [currentDepartamento])

  return {municipios, setMunicipio}
}

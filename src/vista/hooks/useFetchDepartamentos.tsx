import { useEffect, useState } from 'react'
import { Departamentos } from '../types'
import axios from 'axios'

export function useFetchDepartamentos() {
  const [departamentos, setDepartamentos] = useState<string[]>([])

  useEffect(()=> {
    const getDepartamentos  = async() => {
      const {data} = await axios<Departamentos[]>('https://api-colombia.com/api/v1/Department')
      const values = data.map(data => data.name)
      setDepartamentos(values)
    }
    getDepartamentos()
  }, [])

  return [departamentos]
}

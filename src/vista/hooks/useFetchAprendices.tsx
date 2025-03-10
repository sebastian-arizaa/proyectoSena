import { useEffect, useState } from 'react'
import { Aprendiz } from '../types'
import axios from 'axios'

interface Props {
  idFormacion: number
}

export default function useFetchAprendices({idFormacion}: Props) {
  const [aprendices, setAprendices] = useState<Aprendiz[]>([])
  const [aprendicesFiltrados, setAprendicesFiltrados] = useState<Aprendiz[]>([])
  
  useEffect(()=> {
    const getAprendices = async() => {
      const {data} = await axios(`http://localhost:3000/aprendices/por-formacion/${idFormacion}`)
      setAprendices(data)
      setAprendicesFiltrados(data)
    }
    getAprendices()
  }, [])

  return {aprendices, aprendicesFiltrados, setAprendicesFiltrados}
}

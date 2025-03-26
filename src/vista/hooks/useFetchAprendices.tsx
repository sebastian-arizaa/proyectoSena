import { useEffect, useState } from 'react'
import { Aprendiz } from '../types'
import axios from 'axios'

interface Props {
  idFormacion: number
}

export default function useFetchAprendices({idFormacion}: Props) {
  const [aprendices, setAprendices] = useState<Aprendiz[]>([])
  const [aprendicesFiltrados, setAprendicesFiltrados] = useState<Aprendiz[]>([])

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  useEffect(()=> {
    const getAprendices = async() => {
      const {data} = await axios(`${API_URL}/aprendices/por-formacion/${idFormacion}`)
      setAprendices(data)
      setAprendicesFiltrados(data)
    }
    getAprendices()
  }, [])

  return {aprendices, aprendicesFiltrados, setAprendicesFiltrados}
}

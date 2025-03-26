import axios from 'axios'
import { useEffect, useState } from 'react'
import { AprendizCompleto } from '../types'

interface Props {
  numeroIdentificacion: string | null
}

export default function useFetchAprendiz({numeroIdentificacion}: Props) {
  const [aprendiz, setAprendiz] = useState<AprendizCompleto>(aprendizBase)  
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(()=> {
    if(numeroIdentificacion) {
      const getAprendiz = async () => {
        const {data} = await axios(`${API_URL}/aprendices/uno/completo/${numeroIdentificacion}`)
        setAprendiz(data[0])
      }
      getAprendiz()
    }
  }, [])
  return [aprendiz]
}

const aprendizBase: AprendizCompleto = {
  numeroIdentificacion: '',
  nombre: '',
  apellidos: '',
  celular: '',
  email: '',
  idFormacion: '',
  nombreFormacion: '',
  nombreDepartamento: '',
  nombreMunicipio: ''
}
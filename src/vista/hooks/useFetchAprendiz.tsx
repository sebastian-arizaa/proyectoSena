import axios from 'axios'
import { useEffect, useState } from 'react'
import { AprendizCompleto } from '../types'

interface Props {
  numeroIdentificacion: string | null
}

export default function useFetchAprendiz({numeroIdentificacion}: Props) {
  const [aprendiz, setAprendiz] = useState<AprendizCompleto>(aprendizBase)  
  
  useEffect(()=> {
    if(numeroIdentificacion) {
      const getAprendiz = async () => {
        const {data} = await axios(`http://localhost:3000/aprendices/uno/completo/${numeroIdentificacion}`)
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
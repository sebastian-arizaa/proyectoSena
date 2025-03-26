import axios from 'axios'
import { useEffect, useState } from 'react'
import { Formacion} from '../types'

interface Props {
  numeroIdentificacion: string | undefined
}

export function useFetchFormacion({numeroIdentificacion}: Props) {
  const [formacion, setFormacion] = useState<Formacion>(formacionCompletoBase)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(()=> {
    const getFormacion = async() => {
      const {data} = await axios(`${API_URL}/formaciones/uno/${numeroIdentificacion}`)
      setFormacion(data[0])
    }
    getFormacion()
  }, [])

  return [formacion]
}

const formacionCompletoBase: Formacion = {
  nombre: '',
  fechaFin: '',
  fechaInicio: '',
  horario: '',
  instructores: '',
  nombreDepartamento: '',
  numeroIdentificacion: '',
  tipo: '',
  nombreMunicipio: ''
}

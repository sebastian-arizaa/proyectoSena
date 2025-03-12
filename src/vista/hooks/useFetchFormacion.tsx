import axios from 'axios'
import { useEffect, useState } from 'react'
import { FormacionCompleto } from '../types'

interface Props {
  numeroIdentificacion: string | undefined
}

export function useFetchFormacion({numeroIdentificacion}: Props) {
  const [formacion, setFormacion] = useState<FormacionCompleto>(formacionCompletoBase)

  useEffect(()=> {
    const getFormacion = async() => {
      const {data} = await axios(`http://localhost:3000/formaciones/uno/completo/${numeroIdentificacion}`)
      setFormacion(data[0])
    }
    getFormacion()
  }, [])

  return [formacion]
}

const formacionCompletoBase: FormacionCompleto = {
  nombre: '',
  fechaFin: '',
  fechaInicio: '',
  horario: '',
  instructores: '',
  nombreDepartamento: '',
  nombreSede: '',
  numeroIdentificacion: '',
  tipo: '',
  idSede: ''
}

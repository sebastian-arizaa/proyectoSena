import axios from 'axios'
import { useEffect, useState } from 'react'
import { Formacion} from '../types'

interface Props {
  numeroIdentificacion: string | undefined
}

export function useFetchFormacion({numeroIdentificacion}: Props) {
  const [formacion, setFormacion] = useState<Formacion>(formacionCompletoBase)

  useEffect(()=> {
    const getFormacion = async() => {
      const {data} = await axios(`http://localhost:3000/formaciones/uno/${numeroIdentificacion}`)
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

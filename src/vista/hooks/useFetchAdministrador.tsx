import axios from 'axios'
import { useEffect, useState } from 'react'
import { AdminDepartamento, AdminSede, Tipo } from '../types'

interface Props {
  numeroIdentificacion: string | undefined
  tipo: Tipo | undefined
}

export default function useFetchAdministrador({numeroIdentificacion, tipo}: Props) {
  const [administrador, setAdministrador] = useState<AdminDepartamento | AdminSede>(adminDepartamentoBase)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(()=> {
    const getAdministrador = async() => {
      if(tipo == 'Departamento') {
        const {data} = await axios(`${API_URL}/admindepartamento/uno/${numeroIdentificacion}`)
        setAdministrador(data[0])
      }else if(tipo == 'Sede' || tipo == 'Municipio') {
        const {data} = await axios(`${API_URL}/adminsede/uno/${numeroIdentificacion}`)
        setAdministrador(data[0])
      }
    }
    getAdministrador()
  }, [])

  return [administrador]
}

const adminDepartamentoBase: AdminDepartamento = {
  nombre: '',
  apellidos: '',
  nombreDepartamento: '',
  numeroIdentificacion: '',
  password: ''
}

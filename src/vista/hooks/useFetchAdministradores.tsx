import  { useEffect, useState } from 'react'
import axios from 'axios'
import { AdminDepartamento, AdminSede, Tipo } from '../types'

interface Props {
  tipo: Tipo
}

export default function useFetchAdministradores({tipo}: Props) {
  const [administradores, setAdministradores] = useState<AdminDepartamento[] | AdminSede[]>([])
  const [administradoresFiltrados, setAdministradoresFiltrados] = useState<AdminDepartamento[] | AdminSede[]>([])

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  const getAdministradores = (tipo: Tipo) => {
    const getAdminsDepartamento = async() => {
      const {data} = await axios(`${API_URL}/admindepartamento/todos`)
      setAdministradores(data)
      setAdministradoresFiltrados(data)
    }
    const getAdminsSede = async() => {
      const {data} = await axios(`${API_URL}/adminsede/todos`)
      setAdministradores(data)
      setAdministradoresFiltrados(data)
    }
    if(tipo == 'Departamento') getAdminsDepartamento()
    if(tipo == 'Sede') getAdminsSede()
  }

  useEffect(()=> {
    if(tipo == 'Departamento') getAdministradores('Departamento')
    if(tipo == 'Sede' || tipo == 'Municipio') getAdministradores('Sede')
  }, [tipo])

  return {administradores, administradoresFiltrados, setAdministradoresFiltrados}
}

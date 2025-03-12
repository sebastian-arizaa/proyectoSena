import axios from 'axios'
import { useEffect, useState } from 'react'
import { AdminDepartamento, AdminSedeCompleto, Tipo } from '../types'

interface Props {
  numeroIdentificacion: string | undefined
  tipo: Tipo | undefined
}

export default function useFetchAdministrador({numeroIdentificacion, tipo}: Props) {
  const [administrador, setAdministrador] = useState<AdminDepartamento | AdminSedeCompleto>(adminDepartamentoBase)
  useEffect(()=> {
    const getAdministrador = async() => {
      if(tipo == 'Departamento') {
        const {data} = await axios(`http://localhost:3000/admindepartamento/uno/${numeroIdentificacion}`)
        setAdministrador(data[0])
      }else if(tipo == 'Sede') {
        const {data} = await axios(`http://localhost:3000/adminsede/uno/completo/${numeroIdentificacion}`)
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

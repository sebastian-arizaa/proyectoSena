import { IconType } from 'react-icons'
import { AdminSede, Sede } from '../types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

interface Props {
  Icon: IconType,
  itemData: AdminSede
}

export function ItemAdminSede({Icon, itemData}: Props) {
  const navigate = useNavigate()
  const [sede, setSede] = useState<Sede | null>(null)

  useEffect(()=> {
    const getSede = async () => {
      const {data} = await axios(`http://localhost:3000/sedes/uno/${itemData.idSede_as}`)
      setSede(data[0])
    }
    getSede()
  }, [])

  return (
    <div onClick={()=> navigate(`/perfilAdministrador/departamento/${itemData.numeroIdentificacion}`)} className='flex justify-between w-full h-12 px-4 py-2 rounded cursor-pointer bg-gray-200  hover:bg-gray-300 active:bg-gray-200   '>
      <div className='flex items-center gap-4'>
        <Icon/>
        <p className='flex items-center'>{itemData.nombre}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className='flex items-center py-1 px-2 bg-red-200 rounded'>Finalizado</span>
        <p>{sede?.nombre}</p>
      </div>
    </div>
  )
}

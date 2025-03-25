import { IconType } from 'react-icons'
import { AdminSede } from '../types'
import { useNavigate } from 'react-router'

interface Props {
  Icon: IconType,
  itemData: AdminSede
}

export function ItemAdminSede({Icon, itemData}: Props) {
  const navigate = useNavigate()

  return (
    <div onClick={()=> navigate(`/perfilAdministrador/Sede/${itemData.numeroIdentificacion}`)} className='flex justify-between w-full h-12 px-4 py-2 rounded cursor-pointer bg-gray-200  hover:bg-gray-300 active:bg-gray-200'>
      <div className='flex items-center gap-4'>
        <Icon/>
        <p className='flex items-center'>{itemData.nombre}</p>
      </div>
      <div className="flex items-center gap-4">
        <p>{itemData.nombreMunicipio}</p>
      </div>
    </div>
  )
}

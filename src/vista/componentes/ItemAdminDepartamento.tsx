import { IconType } from 'react-icons'
import { AdminDepartamento} from '../types'
import { useNavigate } from 'react-router'

interface Props {
  Icon: IconType,
  itemData: AdminDepartamento
}

export function ItemAdminDepartamento({Icon, itemData}: Props) {
  const navigate = useNavigate()

  return (
    <div onClick={()=> navigate(`/perfilAdministrador/departamento/${itemData.numeroIdentificacion}`)} className='flex justify-between w-full h-12 px-4 py-2 rounded cursor-pointer bg-gray-200  hover:bg-gray-300 active:bg-gray-200   '>
      <div className='flex items-center gap-4'>
        <Icon/>
        <p className='flex items-center'>{itemData.nombre}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className='flex items-center py-1 px-2 bg-red-200 rounded'>Finalizado</span>
        <p>{itemData.nombreDepartamento}</p>
      </div>
    </div>
  )
}

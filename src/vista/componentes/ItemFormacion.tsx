import { IconType } from 'react-icons'
import { Formacion} from '../types'
import { useNavigate } from 'react-router'
import { Button } from './Button'

interface Props {
  Icon: IconType,
  itemData: Formacion
}

export function ItemFormacion({Icon, itemData}: Props) {
  const navigate = useNavigate()

  const goToAprendices = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if(e) {
      e.stopPropagation()
      navigate(`/aprendices/${itemData.numeroIdentificacion}`)
    }
  }

  return (
    <div onClick={()=> navigate('/perfilformacion/' + itemData.numeroIdentificacion)} className='flex justify-between w-full h-12 px-4 py-2 rounded cursor-pointer bg-gray-200  hover:bg-gray-300 active:bg-gray-200   '>
      <div className='flex items-center gap-4'>
        <Icon/>
        <p className='flex items-center'>{itemData.nombre}</p>
      </div>
      <div className="flex items-center gap-4">
        <Button styles='max-sm:text-xxs' onClick={goToAprendices} type='primary'>Ver Aprendices</Button>
        <p>{itemData.nombreMunicipio}</p>
      </div>
    </div>
  )
}

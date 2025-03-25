import { IconType } from 'react-icons'
import { Aprendiz, Formacion} from '../types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

interface Props {
  Icon: IconType,
  itemData: Aprendiz  
}

export function ItemAprendiz({Icon, itemData}: Props) {
  const navigate = useNavigate()
  const [formacion, setFormacion] = useState<Formacion | null>(null)

  useEffect(()=> {
    const getFormacion = async () => {
      const {data} = await axios(`http://localhost:3000/formaciones/uno/${itemData.idFormacion}`)
      setFormacion(data[0])
    }
    getFormacion()
  }, [])

  return (
    <div onClick={()=> navigate(`/perfilaprendiz/${itemData.numeroIdentificacion}`)} className='flex justify-between w-full h-12 px-4 py-2 rounded cursor-pointer bg-gray-200  hover:bg-gray-300 active:bg-gray-200   '>
      <div className='flex items-center gap-4'>
        <Icon/>
        <p className='flex items-center'>{itemData.nombre}</p>
      </div>
      <div className="flex items-center gap-4">
        <p>{formacion?.nombre}</p>
      </div>
    </div>
  )
}

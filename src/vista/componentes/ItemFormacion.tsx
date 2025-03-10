import { IconType } from 'react-icons'
import { Formacion, Sede } from '../types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Button } from './Button'

interface Props {
  Icon: IconType,
  itemData: Formacion
}

export function ItemFormacion({Icon, itemData}: Props) {
  const navigate = useNavigate()
  const [sede, setSede] = useState<Sede | null>(null)

  const goToAprendices = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if(e) {
      e.stopPropagation()
      navigate(`/aprendices/${itemData.numeroIdentificacion}`)
    }
  }

  useEffect(()=> {
    const getSede = async () => {
      const {data} = await axios(`http://localhost:3000/sedes/uno/${itemData.idSede}`)
      setSede(data[0])
      console.log(data)
    }
    getSede()
  }, [])

  return (
    <div onClick={()=> navigate('/perfilformacion/' + itemData.numeroIdentificacion)} className='flex justify-between w-full h-12 px-4 py-2 rounded cursor-pointer bg-gray-200  hover:bg-gray-300 active:bg-gray-200   '>
      <div className='flex items-center gap-4'>
        <Icon/>
        <p className='flex items-center'>{itemData.nombre}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className='flex items-center py-1 px-2 bg-red-200 rounded'>Finalizado</span>
        <Button onClick={goToAprendices} type='primary'>Ver Aprendices</Button>
        <p>{sede?.nombre}</p>
      </div>
    </div>
  )
}

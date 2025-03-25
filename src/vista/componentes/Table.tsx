import { useEffect, useState } from 'react'
import { ItemFormacion } from './ItemFormacion'
// import { Pagination } from './Pagination'
import { AdminDepartamento, AdminSede, Aprendiz, Formacion} from '../types';
import { ItemAdminDepartamento } from './ItemAdminDepartamento';
import { ItemAdminSede } from './ItemAdminSede';
import { ItemAprendiz } from './ItemAprendiz';

import { FaUserTie } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa6';
import { FaUserAlt } from 'react-icons/fa';


interface Props {
  type: 'formacion' | 'adminDepartamento' | 'adminSede' |  'aprendices' | ''
  itemsProps: Formacion[] | AdminDepartamento[] | AdminSede[] | Aprendiz[] | []
}

export default function Table({type, itemsProps}: Props) {
  const [items, setItems] = useState(itemsProps)

  useEffect(()=> {
    setItems(itemsProps)
  }, [itemsProps])

  const renderItems = () => {
    if(type == 'formacion') return items.map(item => <ItemFormacion key={item.numeroIdentificacion} itemData={(item as Formacion)} Icon={FaBookOpen} />)
    if(type == 'adminDepartamento') return items.map(item => <ItemAdminDepartamento key={item.numeroIdentificacion} itemData={(item as AdminDepartamento)} Icon={FaUserTie} />)
    if(type == 'adminSede') return items.map(item => <ItemAdminSede key={item.numeroIdentificacion} itemData={(item as AdminSede)} Icon={FaUserTie} />)
    if(type == 'aprendices') return items.map(item => <ItemAprendiz key={item.numeroIdentificacion} itemData={(item as Aprendiz)} Icon={FaUserAlt} />)
    return []
  }

  return (
    <div className='flex flex-col gap-4 w-full h-full  py-4 border-t-4 border-t-primary '>
      {renderItems()}
      {/* <Pagination/> */}
    </div>
  )
}

  //   cantItems = Math.floor((window.innerHeight * 70 / 100 - 150) / 60)
import React from 'react'
import { Button } from './Button'
import { useNavigate} from 'react-router'

interface Props {
  children: React.JSX.Element | React.JSX.Element[],
  title?: string
  isCreating: boolean,
  isEditing: boolean,
  toggleEdit?: (isEditing: boolean)=> void,
  onClicks: {
    onClickCrear?: () => void,
    onClickActulizar?: () => void,
    onClickEliminar?: () => void,
  }
}

export function Form({children, title, isCreating, isEditing, toggleEdit, onClicks}: Props) {
  const navigate = useNavigate()

  return (
    <div className='w-full pt-16 pb-4'>
      <div className='w-1/2 min-w-[300px] max-w-[600px] pb-8 justify-self-center rounded shadow-lg overflow-hidden'>
        <div className='py-2 px-4 bg-primary'>
          <p className='text-2xl text-center text-white font-semibold'>{title}</p>
        </div>
        <div className='flex flex-col gap-2 p-4'>
          {(children as React.JSX.Element[]).length ? [...(children as React.JSX.Element[])] : children}
          <div className='flex flex-col gap-2 mt-4'>
            {isCreating && (
              <>
                <Button onClick={onClicks.onClickCrear} type='primary'>Crear</Button>
                <Button onClick={() => navigate(-1)} type='cancel'>Cancelar</Button>
              </>
            )}
            {!isEditing && (
              <>
                <Button onClick={() => toggleEdit && toggleEdit(!isEditing)} type='primary'>Editar</Button>
                <Button onClick={onClicks.onClickEliminar} type='cancel'>Eliminar</Button>
              </>
            )}
            {(isEditing && !isCreating)  && (
              <>
                <Button onClick={onClicks.onClickActulizar} type='primary'>Guardar</Button>
                <Button onClick={() => {if(toggleEdit) toggleEdit(!isEditing); navigate(0)}} type='cancel'>Cancelar</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

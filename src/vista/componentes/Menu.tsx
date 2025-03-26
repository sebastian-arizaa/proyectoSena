import { useNavigate } from 'react-router'
import { Button } from './Button'
// import { useLocalStorage } from '../hooks/useLocalStorage'

export function Menu() {
  const navigate = useNavigate()
  // const {saveItemData} = useLocalStorage()

  return (
    <div className=' flex flex-col gap-4 w-[90%]  h-full px-4 py-2  bg-primary'>
      <Button disabled={true} onClick={() => navigate('/perfil')} type='third'>Perfil</Button>
      <Button onClick={() => navigate('/administradores')} type='third'>Administradores</Button>
      <Button onClick={() => navigate('/formaciones')} type='third'>Formaciones</Button>
      <Button disabled={true} onClick={() => {navigate('/ingresar')}} type='third'>Cerrar sesion</Button>
    </div>
  )
}

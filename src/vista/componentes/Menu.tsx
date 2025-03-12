import { useNavigate } from 'react-router'
import { Button } from './Button'

export function Menu() {
  const navigate = useNavigate()

  return (
    <div className=' flex flex-col gap-4 w-[90%]  h-full px-4 py-2  bg-primary '>
      <Button onClick={() => navigate('/perfil')} type='third'>Perfil</Button>
      {/* <Button onClick={() => navigate('/perfiladministrador')} type='third'>Perfil administrador</Button> */}
      {/* <Button onClick={() => navigate('/perfilformacion')} type='third'>Perfil formacion</Button> */}
      {/* <Button onClick={() => navigate('/perfilaprendiz')} type='third'>Perfil aprendiz</Button> */}
      <Button onClick={() => navigate('/administradores')} type='third'>Administradores</Button>
      <Button onClick={() => navigate('/formaciones')} type='third'>Formaciones</Button>
      {/* <Button onClick={() => navigate('/aprendices/3')} type='third'>Aprendices</Button> */}
      <Button onClick={() => navigate('/ingresar')} type='third'>Cerrar sesion</Button>
    </div>
  )
}

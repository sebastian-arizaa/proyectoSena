import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { Select } from '../componentes/Select';
import { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { useLocalStorage } from '../hooks/useLocalStorage';

export function Perfil() {
  // const navigate = useNavigate()
  // const {localStorageData} = useLocalStorage()

  const [isEditing, setIsEditing] = useState(false)
    
  const toggleEdit = (isEditing: boolean) => {
    setIsEditing(isEditing)
  }

  const returnOnClicks = () => {
    return {

    }
  }

  // useEffect(()=> {
  //   if(!localStorageData.isLogged) navigate('/ingresar')
  // }, [])

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form onClicks={returnOnClicks()} isCreating={false} toggleEdit={toggleEdit} isEditing={isEditing}  title="Perfil">
          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <p>Nombre</p>
              <Input disabled={!isEditing} value='Sebastian' type='text'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>Apellidos</p>
              <Input disabled={!isEditing} value='Sebastian' type='text'/>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <p>N. Identificacion</p>
            <Input disabled={!isEditing} value='Sebastian' type='text'/>
          </div>

          <div className='flex flex-col w-full'>
            <p>Contraseña</p>
            <Input disabled={!isEditing} value='Sebastian' type='password'/>
          </div>

          <div className='flex gap-4'>
            <div className='flex items-center w-full'>
              <p>Departamento:</p>
              <Select disabled={isEditing} options={['Santander']}/>
            </div>

            <div className='flex items-center w-full'>
              <p>Sede:</p>
              <Select disabled={!isEditing} options={['Velez', 'Puente Araujo']}/>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}

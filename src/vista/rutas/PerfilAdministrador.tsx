import { useState } from 'react';
import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { Select } from '../componentes/Select';

export function PerfilAdministrador() {
  const [isEditing, setIsEditing] = useState(false)
  
  const toggleEdit = (isEditing: boolean) => {
    setIsEditing(isEditing)
  }

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form toggleEdit={toggleEdit} isEditing={isEditing}  title="Perfil Administrador">
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
              <Select title='Departamento' disabled={isEditing} options={['Santander']}/>
            </div>

            <div className='flex items-center w-full'>
              <Select title='Sede' disabled={!isEditing} options={['Velez', 'Puente Araujo']}/>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}

import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { Select } from '../componentes/Select';
import { useState } from 'react';

export function PerfilFormacion() {
  const [isEditing, setIsEditing] = useState(false)
  console.log(isEditing)
  // new Date($0.value).toLocaleDateString('en-es')

  const toggleEdit = (isEditing: boolean) => {
    setIsEditing(isEditing)
  }

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form toggleEdit={toggleEdit} isEditing={isEditing} title="Perfil Formacion">
          {/* <div className='flex flex-col w-full'>
            <p>Nombre</p>
            <Input disabled={!isEditing} value='Sebastian' type='text'/>
          </div> */}

          <div className='flex items-center w-full'>
            <Select width='w-96' title='Formacion' disabled={isEditing} options={['Santander']}/>
          </div>

          <div className='flex gap-4'>
            <div className='flex items-center w-full'>
              <Select title='Departamento' disabled={isEditing} options={['Santander']}/>
            </div>
            <div className='flex items-center w-full'>
              <Select title='Sede' disabled={!isEditing} options={['Velez', 'Puente Araujo']}/>
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <p>Tipo</p>
              <Input disabled={!isEditing} value='Tegnologo ' type='text'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>N. Ficha</p>
              <Input disabled={!isEditing} type='text'/>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p>Instructores</p>
            <Input disabled={!isEditing} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Horario</p>
            <Input value='Lunes - Viernes 12:00 - 18:00' disabled={!isEditing} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Fecha de Inicio del programa</p>
            <Input disabled={!isEditing} value='11-04-2025' type='date'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Fecha de Fin del programa</p>
            <Input disabled={!isEditing} value='2005-04-12' type='date'/>
          </div>
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}

import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { useState } from 'react';
import { Select } from '../componentes/Select';
import { Sede } from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchSedes } from '../hooks/useFetchSedes';
import { useFetchFormaciones } from '../hooks/useFetchFormaciones';

export function CrearAdministrador() {
  const [inputNombreValue, setInputNombreValue] = useState('')
  const [inputApellidosValue, setInputApellidosValue] = useState('')
  const [inputNumeroIdentificacionValue, setInputNumeroIdentificacionValue] = useState('')
  const [inputCelularValue, setInputCelularValue] = useState('')
  const [inputEmailValue, setInputEmailValue] = useState('')

  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const [sedes] = useFetchSedes({currentDepartamento})
  const [currentSede, setCurrentSede] = useState<Sede | null>(null)
  const {formaciones} = useFetchFormaciones({currentSede, sedes})
  const [currentFormacion, setCurrentFormacion] = useState<string>('')
  console.log('🚀 ~ CrearAdministrador ~ currentFormacion:', currentFormacion)

  const crear = () => {
    console.log('Procede a guardar')
  }


  const returnOnClicks = () => {
    return {
      onClickCrear:  crear,     
    }
  }

  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentDepartamento(value)
  }

  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const sedeEncontrada = sedes.find(sede => sede.nombre == value)
    if(sedeEncontrada) setCurrentSede(sedeEncontrada) 
  }

  const selectFormacion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentFormacion(value) 
  }

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form isEditing={true} onClicks={returnOnClicks()}  isCreating={true} title="Crear Administrador">
        <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <p>Nombre</p>
              <Input  value='Sebastian' type='text'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>Apellidos</p>
              <Input  value='Sebastian' type='text'/>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <p>N. Identificacion</p>
            <Input  value='Sebastian' type='text'/>
          </div>

          <div className='flex flex-col w-full'>
            <p>Contraseña</p>
            <Input  value='Sebastian' type='password'/>
          </div>

          <div className='flex gap-4'>
            <div className='flex items-center w-full'>
              <Select onChange={selectDepartamento} title='Departamento' options={departamentos}/>
            </div>
            <div className='flex items-center w-full'>
              <Select onChange={selectSede} title='Sede' options={sedes.map(sede => sede.nombre)} />
            </div>
          </div>
          

          {/* <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <p>Nombre</p>
              <Input setValue={setInputNombreValue} value={inputNombreValue} type='text'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>Apellidos</p>
              <Input setValue={setInputApellidosValue} value={inputApellidosValue} type='text'/>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <p>N. Identificacion</p>
            <Input setValue={setInputNumeroIdentificacionValue} value={inputNumeroIdentificacionValue} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Celular</p>
            <Input setValue={setInputCelularValue} value={inputCelularValue ?? ''} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Email</p>
            <Input setValue={setInputEmailValue} value={inputEmailValue ?? ''} type='text'/>
          </div>


          <div className='flex gap-4'>
            <div className='flex items-center w-full'>
              <Select onChange={selectDepartamento} title='Departamento' options={departamentos}/>
            </div>
            <div className='flex items-center w-full'>
              <Select onChange={selectSede} title='Sede' options={sedes.map(sede => sede.nombre)} />
            </div>
          </div>
          <div className='flex items-center w-full'>
            <Select onChange={selectFormacion} width='w-full' title='Formacion'  options={formaciones.map(formacion => formacion.nombre)}/>
          </div>   */}
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}


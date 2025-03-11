import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { useState } from 'react';
import { Select } from '../componentes/Select';
import { Sede, Tipo } from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchSedes } from '../hooks/useFetchSedes';
import { AdminDepartamento, AdminSede } from '../types';
import axios from 'axios';


export function CrearAdministrador() {
  const [inputNombreValue, setInputNombreValue] = useState('')
  const [inputApellidosValue, setInputApellidosValue] = useState('')
  const [inputNumeroIdentificacionValue, setInputNumeroIdentificacionValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')

  const [tipo, setTipo] = useState<Tipo>('')

  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const [sedes] = useFetchSedes({currentDepartamento, tipo})
  const [currentSede, setCurrentSede] = useState<Sede | null>(null)

  const selectTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == 'Departamento' || value == 'Sede' || value == '') {
      setTipo(value)
      setCurrentDepartamento('')
    }
  }

  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentDepartamento(value)
  }

  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == '') setCurrentSede(null)
    const sedeEncontrada = sedes.find(sede => sede.nombre == value)
    if(sedeEncontrada) setCurrentSede(sedeEncontrada) 
  }

  const limpiarFormulario = () => {
    setInputNombreValue('')
    setInputApellidosValue('')
    setInputNumeroIdentificacionValue('')
    setInputPasswordValue('')
    setTipo('')
    setCurrentDepartamento('')
    setCurrentSede(null)
  }

  const crear = async () => {
    console.log('Procede a guardar')
    if(tipo == 'Departamento') {
      if(!inputNombreValue) return 
      if(!inputApellidosValue) return
      if(!inputNumeroIdentificacionValue) return
      if(!inputPasswordValue) return
      if(!currentDepartamento) return
      const administrador: AdminDepartamento = {
        nombre: inputNombreValue,
        apellidos: inputApellidosValue,
        numeroIdentificacion: inputNumeroIdentificacionValue,
        password: inputPasswordValue,
        nombreDepartamento: currentDepartamento,
      }
      const {status} = await axios.post('http://localhost:3000/admindepartamento', administrador)
      if(status == 200) {
        limpiarFormulario()
      }
    }
    
    if(tipo == 'Sede') {
      if(!inputNombreValue) return 
      if(!inputApellidosValue) return
      if(!inputNumeroIdentificacionValue) return
      if(!inputPasswordValue) return
      if(!currentSede) return
      const administrador: AdminSede = {
        nombre: inputNombreValue,
        apellidos: inputApellidosValue,
        numeroIdentificacion: inputNumeroIdentificacionValue,
        password: inputPasswordValue,
        idSede_as: currentSede.numeroIdentificacion.toString()
      }
      const {status} = await axios.post('http://localhost:3000/adminsede', administrador)
      if(status == 200) {
        limpiarFormulario()
      }
    } 

  }

  const returnOnClicks = () => {
    return {
      onClickCrear:  crear,     
    }
  }

  const renderPorTipo = () => {
    if(tipo == 'Departamento') return (
      <div className='flex gap-4'>
        <Select onChange={selectDepartamento} title='Departamento' options={departamentos}/>
      </div>
    )
    if(tipo == 'Sede') return (
      <div className='flex gap-4'>
        <div className='flex items-center w-full'>
          <Select onChange={selectDepartamento} title='Departamento' options={departamentos}/>
        </div>
        <div className='flex items-center w-full'>
          <Select onChange={selectSede} title='Sede' options={sedes.map(sede => sede.nombre)} />
        </div>
      </div>
    )
    return <></>
  }

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form isEditing={true} onClicks={returnOnClicks()}  isCreating={true} title="Crear Administrador">
          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <p>Nombre</p>
              <Input value={inputNombreValue} setValue={setInputNombreValue}  type='text'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>Apellidos</p>
              <Input value={inputApellidosValue} setValue={setInputApellidosValue} type='text'/>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <p>N. Identificacion</p>
            <Input value={inputNumeroIdentificacionValue} setValue={setInputNumeroIdentificacionValue} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Contraseña</p>
            <Input value={inputPasswordValue} setValue={setInputPasswordValue} type='password'/>
          </div>
          <div>
            <Select width='w-full' onChange={selectTipo} title='Tipo' options={['Departamento', 'Sede']}/>
          </div>
          {renderPorTipo()}
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}


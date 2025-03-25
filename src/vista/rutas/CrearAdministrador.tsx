import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { useEffect, useState } from 'react';
import { Select } from '../componentes/Select';
import { Tipo } from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchMunicipio } from '../hooks/useFetchMunicipio';
import { AdminDepartamento, AdminSede } from '../types';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CrearAdministrador() {
  const navigate = useNavigate()
  const {localStorageData} = useLocalStorage()

  const [inputNombreValue, setInputNombreValue] = useState('')
  const [inputApellidosValue, setInputApellidosValue] = useState('')
  const [inputNumeroIdentificacionValue, setInputNumeroIdentificacionValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')

  const [tipo, setTipo] = useState<Tipo>('')

  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const {municipios, setMunicipio} = useFetchMunicipio({currentDepartamento, tipo})
  const [currentMunicipio, setCurrentMunicipio] = useState<string>('')

  const selectTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == 'Departamento' || value == 'Sede' || value == 'Municipio' || value == '') {
      setTipo(value)
      setCurrentDepartamento('')
    }
  }

  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == '') setMunicipio([])
    setCurrentDepartamento(value)
  }

  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentMunicipio(value)
  }

  const limpiarFormulario = () => {
    setInputNombreValue('')
    setInputApellidosValue('')
    setInputNumeroIdentificacionValue('')
    setInputPasswordValue('')
    setTipo('')
    setCurrentDepartamento('')
    setCurrentMunicipio('')
  }

  const crear = async () => {
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
    
    if(tipo == 'Sede' || tipo == 'Municipio') {
      if(!inputNombreValue) return 
      if(!inputApellidosValue) return
      if(!inputNumeroIdentificacionValue) return
      if(!inputPasswordValue) return
      if(!currentMunicipio) return
      const administrador: AdminSede = {
        nombre: inputNombreValue,
        apellidos: inputApellidosValue,
        numeroIdentificacion: inputNumeroIdentificacionValue,
        password: inputPasswordValue,
        nombreDepartamento: currentDepartamento,
        nombreMunicipio: currentMunicipio
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
    if(tipo == 'Sede' || tipo == 'Municipio') return (
      <div className='flex gap-4'>
        <div className='flex items-center w-full'>
          <Select onChange={selectDepartamento} title='Departamento' options={departamentos}/>
        </div>
        <div className='flex items-center w-full'>
          <Select onChange={selectSede} title='Sede' options={municipios} />
        </div>
      </div>
    )
    return <></>
  }

  useEffect(()=> {
    if(!localStorageData.isLogged) navigate('/ingresar')
  }, [])

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
            <Select width='w-full' value={tipo} onChange={selectTipo} title='Tipo' options={['Departamento', 'Municipio']}/>
          </div>
          {renderPorTipo()}
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}


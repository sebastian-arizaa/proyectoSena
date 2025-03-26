import { useEffect, useState } from 'react';
import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { Select } from '../componentes/Select';
import { useNavigate, useParams } from 'react-router';
import useFetchAdministrador from '../hooks/useFetchAdministrador';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { AdminDepartamento, AdminSede, Tipo } from '../types';
import { useFetchMunicipio } from '../hooks/useFetchMunicipio';
import axios from 'axios';
// import { useLocalStorage } from '../hooks/useLocalStorage';

export function PerfilAdministrador() {
  const navigate = useNavigate()
  // const {localStorageData} = useLocalStorage()

  const {numeroIdentificacion, tipo} = useParams<{numeroIdentificacion: string, tipo: Tipo}>()
  const [administrador] = useFetchAdministrador({numeroIdentificacion, tipo})

  const [inputNombreValue, setInputNombreValue] = useState('')
  const [inputApellidosValue, setInputApellidosValue] = useState('')
  const [inputNumeroIdentificacionValue, setInputNumeroIdentificacionValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')

  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const {municipios, setMunicipio} = useFetchMunicipio({currentDepartamento, tipo})
  const [currentMunicipio, setCurrentMunicipio] = useState<string>('')

  const [isEditing, setIsEditing] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == '') setMunicipio([])
    setCurrentDepartamento(value)
  }

  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentMunicipio(value)
  }

  const toggleEdit = (isEditing: boolean) => {
    setIsEditing(isEditing)
  }

  const edit = async() => {
    if(!inputNombreValue) return
    if(!inputApellidosValue) return
    if(!inputNumeroIdentificacionValue) return
    if(!inputPasswordValue) return
    if(!currentDepartamento) return

    if(tipo == 'Departamento') {
      const adminDepartamento: AdminDepartamento = {
        nombre: inputNombreValue,
        apellidos: inputApellidosValue,
        numeroIdentificacion: inputNumeroIdentificacionValue,
        password: inputPasswordValue,
        nombreDepartamento: currentDepartamento
      }
      const {status} = await axios.patch(`${API_URL}/admindepartamento/${numeroIdentificacion}`, adminDepartamento)
      if(status == 200) {
        setIsEditing(false)
      }
    }else if(tipo == 'Sede') {
      const adminSede: AdminSede = {
        nombre: inputNombreValue,
        apellidos: inputApellidosValue,
        numeroIdentificacion: inputNumeroIdentificacionValue,
        password: inputPasswordValue,
        nombreDepartamento: currentDepartamento,
        nombreMunicipio: currentMunicipio
      }
      const {status} = await axios.patch(`${API_URL}/adminsede/${numeroIdentificacion}`, adminSede)
      if(status == 200) {
        setIsEditing(false)
      } 
    }
  }

  const eliminar = async() => {
    if(tipo == 'Departamento') {
      const {status} = await axios.delete(`${API_URL}/admindepartamento/${numeroIdentificacion}`)
      if(status == 200) {
        navigate('/administradores')
      }
    }else if(tipo == 'Sede') {
      const {status} = await axios.delete(`${API_URL}/adminsede/${numeroIdentificacion}`)
      if(status == 200) {
        navigate('/administradores')
      }
    }
  }

  const returnOnClicks = () => {
    return {
      onClickActulizar: edit,     
      onClickEliminar: eliminar,     
    }
  }

  const renderPorTipo = () => {
    if(tipo == 'Departamento') return (
      <div className='flex gap-4'>
        <Select disabled={!isEditing} value={currentDepartamento} onChange={selectDepartamento} title='Departamento' options={departamentos}/>
      </div>
    )
    if(tipo == 'Sede') return (
      <div className='flex not-md:flex-col gap-4'>
        <div className='flex items-center w-full'>
          <Select disabled={!isEditing} value={currentDepartamento} onChange={selectDepartamento} title='Departamento' options={departamentos}/>
        </div>
        <div className='flex items-center w-full'>
          <Select disabled={!isEditing} value={currentMunicipio} onChange={selectSede} title='Sede' options={municipios} />
        </div>
      </div>
    )
    return <></>
  }

  useEffect(()=> {
    setInputNombreValue(administrador?.nombre)
    setInputApellidosValue(administrador?.apellidos)
    setInputNumeroIdentificacionValue(administrador?.numeroIdentificacion)
    setInputPasswordValue(administrador?.password)
    if(tipo == 'Departamento') {
      setCurrentDepartamento((administrador as AdminDepartamento)?.nombreDepartamento)
    }else if(tipo == 'Sede' || tipo == 'Municipio') {
      setCurrentDepartamento((administrador as AdminSede).nombreDepartamento)
      setCurrentMunicipio((administrador as AdminSede).nombreMunicipio)
    }
  }, [administrador])

  // useEffect(()=> {
  //   if(!localStorageData.isLogged) navigate('/ingresar')
  // }, [])

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form onClicks={returnOnClicks()} toggleEdit={toggleEdit} isCreating={false} isEditing={isEditing}  title="Perfil Administrador">
          <div className='flex gap-4 max-sm:flex-col max-sm:gap-2'>
            <div className='flex flex-col w-full'>
              <p>Nombre</p>
              <Input disabled={!isEditing} value={inputNombreValue} setValue={setInputNombreValue}  type='text'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>Apellidos</p>
              <Input disabled={!isEditing} value={inputApellidosValue} setValue={setInputApellidosValue} type='text'/>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <p>N. Identificacion</p>
            <Input disabled={!isEditing} value={inputNumeroIdentificacionValue} setValue={setInputNumeroIdentificacionValue} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Contraseña</p>
            <Input disabled={!isEditing} value={inputPasswordValue} setValue={setInputPasswordValue} type='password'/>
          </div>
          {renderPorTipo()}
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}

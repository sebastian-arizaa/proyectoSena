import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { useEffect, useState } from 'react';
import { Select } from '../componentes/Select';
import { useNavigate, useParams } from 'react-router';
import useFetchAprendiz from '../hooks/useFetchAprendiz';
import { Aprendiz } from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchMunicipio } from '../hooks/useFetchMunicipio';
import { useFetchFormaciones } from '../hooks/useFetchFormaciones';
import axios from 'axios';
// import { useLocalStorage } from '../hooks/useLocalStorage';

export function PerfilAprendiz() {
  const navigate = useNavigate()
  // const {localStorageData} = useLocalStorage()
  
  const {numeroIdentificacion} = useParams()
  const [aprendiz] = useFetchAprendiz({numeroIdentificacion: numeroIdentificacion ?? null})
  const [isEditing, setIsEditing] = useState(false)
  
  const [inputNombreValue, setInputNombreValue] = useState('')
  const [inputApellidosValue, setInputApellidosValue] = useState('')
  const [inputNumeroIdentificacionValue, setInputNumeroIdentificacionValue] = useState('')
  const [inputCelularValue, setInputCelularValue] = useState('')
  const [inputEmailValue, setInputEmailValue] = useState('')

  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const {municipios} = useFetchMunicipio({currentDepartamento})
  const [currentMunicipio, setCurrentMunicipio] = useState<string>('')
  const {formaciones} = useFetchFormaciones({currentMunicipio, municipios})
  const [currentFormacion, setCurrentFormacion] = useState<string>('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentDepartamento(value)
  }
  
  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentMunicipio(value)
  }

  const selectFormacion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentFormacion(value)
  }


  const toggleEdit = (isEditing: boolean) => {
    setIsEditing(isEditing)
  }

  const edit = async() => {
    if(!inputNombreValue) return 
    if(!inputApellidosValue) return 
    if(!inputNumeroIdentificacionValue) return 
    if(!inputCelularValue) return 
    if(!inputEmailValue) return
    if(!currentFormacion) return

    const newFormacion = formaciones.find(formacion => formacion.nombre === currentFormacion)
    const newAprendiz: Aprendiz = {
      nombre: inputNombreValue,
      apellidos: inputApellidosValue,
      numeroIdentificacion: inputNumeroIdentificacionValue,
      celular: inputCelularValue,
      email: inputEmailValue,
      idFormacion: newFormacion?.numeroIdentificacion ?? null
    }

    const {status} = await axios.patch(`${API_URL}/aprendices/${numeroIdentificacion}`, newAprendiz)
    if(status) {
      navigate(`/aprendices/${aprendiz.idFormacion}`)
    }
  }

  const eliminar = async() => {
    const {status} = await axios.delete(`${API_URL}/aprendices/${numeroIdentificacion}`)
    if(status == 200) {
      navigate(`/aprendices/${aprendiz.idFormacion}`)
    }
  }

  const returnOnClicks = () => {
    return {
      onClickActulizar:  edit,     
      onClickEliminar:  eliminar,     
    }
  }

  useEffect(()=> {
    console.log(aprendiz.nombre)
    setInputNombreValue(aprendiz.nombre)
    setInputApellidosValue(aprendiz.apellidos)
    setInputNumeroIdentificacionValue(aprendiz.numeroIdentificacion)
    setInputCelularValue(aprendiz.celular ?? '')
    setInputEmailValue(aprendiz.email ?? '')

    setCurrentDepartamento(aprendiz.nombreDepartamento)
    setCurrentMunicipio(aprendiz.nombreMunicipio)
  }, [aprendiz])

  useEffect(()=> {
    setCurrentFormacion(aprendiz.nombreFormacion)
  }, [currentMunicipio])

  // useEffect(()=> {
  //   if(!localStorageData.isLogged) navigate('/ingresar')
  // }, [])

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form  onClicks={returnOnClicks()} toggleEdit={toggleEdit} isCreating={false} isEditing={isEditing} title="Perfil Aprendiz">
          <div className='flex gap-4 max-sm:flex-col max-sm:gap-2'>
            <div className='flex flex-col w-full'>
              <p>Nombre</p>
              <Input setValue={setInputNombreValue} disabled={!isEditing} value={inputNombreValue} type='text'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>Apellidos</p>
              <Input setValue={setInputApellidosValue} disabled={!isEditing} value={inputApellidosValue} type='text'/>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <p>N. Identificacion</p>
            <Input setValue={setInputNumeroIdentificacionValue} disabled={!isEditing} value={inputNumeroIdentificacionValue} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Celular</p>
            <Input setValue={setInputCelularValue} disabled={!isEditing} value={inputCelularValue ?? ''} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Email</p>
            <Input setValue={setInputEmailValue} disabled={!isEditing} value={inputEmailValue ?? ''} type='text'/>
          </div>


          <div className='flex gap-4 max-sm:flex-col max-sm:gap-2'>
            <div className='flex items-center w-full'>
              <Select value={currentDepartamento} onChange={selectDepartamento} title='Departamento' disabled={!isEditing} options={departamentos}/>
            </div>
            <div className='flex items-center w-full'>
              <Select value={currentMunicipio} onChange={selectSede} title='Municipio' disabled={!isEditing} options={municipios} />
            </div>
          </div>
          <div className='flex items-center w-full'>
            <Select value={currentFormacion} onChange={selectFormacion} width='w-full' title='Formacion' disabled={!isEditing} options={formaciones.map(formacion => formacion.nombre)}/>
          </div>  
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}


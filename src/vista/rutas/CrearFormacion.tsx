import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { useEffect, useState } from 'react';
import { Select } from '../componentes/Select';
import { Formacion} from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchMunicipio } from '../hooks/useFetchMunicipio';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CrearFormacion() {
  const navigate = useNavigate()
  const {localStorageData} = useLocalStorage()

  const [inputNombreFormacionValue, setInputNombreFormacionValue] = useState('')
  const [inputInstructoresValue, setInputInstructoresValue] = useState('')
  const [inputHorarioValue, setInputHorarioValue] = useState('')
  const [inputFechaInicioValue, setInputFechaInicioValue] = useState('')
  const [inputFechaFinValue, setInputFechaFinValue] = useState('')
  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const {municipios, setMunicipio} = useFetchMunicipio({currentDepartamento})
  const [currentMunicipio, setCurrentMunicipio] = useState<string>('')
  const [currentTipoFormacion, setCurrentTipoFormacion] = useState<string>('')
 
  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == '') setMunicipio([])
    setCurrentDepartamento(value)
    setCurrentMunicipio('')
  }

  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentMunicipio(value)
  }

  const selectTipoFormacion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentTipoFormacion(value)
  }

  const limpiarFormulario = () => {
    setInputNombreFormacionValue('')
    setInputInstructoresValue('')
    setInputHorarioValue('')
    setInputFechaInicioValue('')
    setInputFechaFinValue('')
    setCurrentDepartamento('')
    setCurrentMunicipio('')
    setCurrentTipoFormacion('')
  }

  const crear = async () => {
    if(!inputNombreFormacionValue) return 
    if(!currentTipoFormacion) return
    if(!inputInstructoresValue) return
    if(!inputFechaInicioValue) return
    if(!inputFechaFinValue) return
    if(!inputHorarioValue) return
    if(!currentMunicipio) return

    const formacion: Formacion = {
      nombre: inputNombreFormacionValue,
      numeroIdentificacion: '',
      tipo: currentTipoFormacion,
      instructores: inputInstructoresValue,
      fechaInicio: inputFechaInicioValue,
      fechaFin: inputFechaFinValue,
      horario: inputHorarioValue,
      nombreDepartamento: currentDepartamento,
      nombreMunicipio: currentMunicipio
    }

    const {status} = await axios.post('http://localhost:3000/formaciones', formacion)
    if(status == 200) {
      limpiarFormulario()
    }
  }

  const returnOnClicks = () => {
    return {
      onClickCrear:  crear,     
    }
  }

  useEffect(()=> {
    if(!localStorageData.isLogged) navigate('/ingresar')
  }, []) 

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form isEditing={true} onClicks={returnOnClicks()}  isCreating={true} title="Crear Formación">
          <div className='flex gap-4'>
            <div className='flex items-center w-full'>
              <Select value={currentDepartamento} onChange={selectDepartamento} title='Departamento' options={departamentos}/>
            </div>
            <div className='flex items-center w-full'>
              <Select value={currentMunicipio} onChange={selectSede} title='Municipio' options={municipios} />
            </div>
          </div>
          
          <div className='flex gap-4'>
            <Select value={currentTipoFormacion} onChange={selectTipoFormacion} width='w-full' title='Tipo' options={['Tecnólogo', 'Técnico']}/>
          </div>

          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <p>Nombre De Formación</p>
              <Input value={inputNombreFormacionValue} setValue={setInputNombreFormacionValue} type='text' placeholder='Programación de Software'/>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p>Instructores</p>
            <Input value={inputInstructoresValue} setValue={setInputInstructoresValue} type='text' placeholder='Instructor 1, Instructor2, ...'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Horario</p>
            <Input value={inputHorarioValue} setValue={setInputHorarioValue} type='text' placeholder='Lunes, Martes, ...'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Fecha de Inicio del programa</p>
            <Input value={inputFechaInicioValue} setValue={setInputFechaInicioValue} type='date'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Fecha de Fin del programa</p>
            <Input value={inputFechaFinValue} setValue={setInputFechaFinValue} type='date'/>
          </div>
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}


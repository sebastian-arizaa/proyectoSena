import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { Select } from '../componentes/Select';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useFetchFormacion } from '../hooks/useFetchFormacion';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { Formacion } from '../types';
import { useFetchMunicipio } from '../hooks/useFetchMunicipio';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function PerfilFormacion() {
  const navigate = useNavigate()   
  const {localStorageData} = useLocalStorage()

  const {numeroIdentificacion} = useParams()
  const [formacion] = useFetchFormacion({numeroIdentificacion})

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

  const [isEditing, setIsEditing] = useState(false)

  useEffect(()=> {

    setInputNombreFormacionValue(formacion?.nombre)
    setInputInstructoresValue(formacion?.instructores)
    setInputHorarioValue(formacion?.horario)
    setInputFechaInicioValue(formacion?.fechaInicio.slice(0, 10))
    setInputFechaFinValue(formacion?.fechaFin.slice(0, 10))
    setCurrentTipoFormacion(formacion?.tipo)
    setCurrentDepartamento(formacion?.nombreDepartamento)
    setCurrentMunicipio(formacion?.nombreMunicipio)
  }, [formacion])


  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == '') setMunicipio([])
    setCurrentDepartamento(value)
  }

  const selectMunicipio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentMunicipio(value)
  }

  const selectTipoFormacion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentTipoFormacion(value)
  }

  const toggleEdit = (isEditing: boolean) => {
    setIsEditing(isEditing)
  }


  const edit = async() => {
    if(!inputNombreFormacionValue) return
    if(!currentTipoFormacion) return
    if(!inputNombreFormacionValue) return
    if(!inputInstructoresValue) return
    if(!inputHorarioValue) return
    if(!inputFechaInicioValue) return
    if(!inputFechaFinValue) return

    const newFormacion: Formacion = {
      nombre: inputNombreFormacionValue,
      tipo: currentTipoFormacion,
      instructores: inputInstructoresValue,
      horario: inputHorarioValue,
      fechaInicio: inputFechaInicioValue,
      fechaFin: inputFechaFinValue,
      numeroIdentificacion: formacion.numeroIdentificacion,
      nombreDepartamento: currentDepartamento,
      nombreMunicipio: currentMunicipio
    }

    const {status} = await axios.patch(`http://localhost:3000/formaciones/${numeroIdentificacion}`, newFormacion)
    if(status == 200) {
      navigate('/formaciones')
    }
  }

  const eliminar = async() => {
    const {status} = await axios.delete(`http://localhost:3000/formaciones/${numeroIdentificacion}`)
    if(status == 200) {
      navigate('/formaciones')
    }
  }

  const returnOnClicks = () => {
    return {
      onClickActulizar: edit,     
      onClickEliminar: eliminar,     
    }
  }

  useEffect(()=> {
    if(!localStorageData.isLogged) navigate('/ingresar')
  }, [])

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form onClicks={returnOnClicks()} isCreating={false} toggleEdit={toggleEdit} isEditing={isEditing} title="Perfil Formacion">
          <div className='flex gap-4 max-sm:flex-col max-sm:gap-2'>
            <div className='flex items-center w-full'>
              <Select disabled={!isEditing} value={currentDepartamento} onChange={selectDepartamento} title='Departamento' options={departamentos}/>
            </div>
            <div className='flex items-center w-full'>
              <Select disabled={!isEditing} value={currentMunicipio} onChange={selectMunicipio} title='Sede' options={municipios} />
            </div>
          </div>
          
          <div className='flex gap-4'>
            <Select disabled={!isEditing} value={currentTipoFormacion} onChange={selectTipoFormacion} width='w-full' title='Tipo' options={['Tecnólogo', 'Técnico']}/>
          </div>

          <div className='flex gap-4 max-sm:flex-col max-sm:gap-2'>
            <div className='flex flex-col w-full'>
              <p>Nombre De Formación</p>
              <Input disabled={!isEditing} value={inputNombreFormacionValue} setValue={setInputNombreFormacionValue} type='text'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>N. Ficha</p>
              <Input value={formacion.numeroIdentificacion.toString()} disabled={true} type='text'/>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p>Instructores</p>
            <Input disabled={!isEditing} value={inputInstructoresValue} setValue={setInputInstructoresValue} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Horario</p>
            <Input disabled={!isEditing} value={inputHorarioValue} setValue={setInputHorarioValue} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Fecha de Inicio del programa</p>
            <Input disabled={!isEditing} value={inputFechaInicioValue} setValue={setInputFechaInicioValue} type='date'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Fecha de Fin del programa</p>
            <Input disabled={!isEditing} value={inputFechaFinValue} setValue={setInputFechaFinValue} type='date'/>
          </div>
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}

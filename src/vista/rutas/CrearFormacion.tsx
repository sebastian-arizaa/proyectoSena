import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { useState } from 'react';
import { Select } from '../componentes/Select';
import { Formacion, Sede } from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchSedes } from '../hooks/useFetchSedes';
import axios from 'axios';

// type TipoFormacion = 'Tegnologo' | 'Tecnico' | ''
// type Date = `${string}-${string}-${string}`

export function CrearFormacion() {
  const [inputNombreFormacionValue, setInputNombreFormacionValue] = useState('')
  const [inputInstructoresValue, setInputInstructoresValue] = useState('')
  const [inputHorarioValue, setInputHorarioValue] = useState('')
  const [inputFechaInicioValue, setInputFechaInicioValue] = useState('')
  const [inputFechaFinValue, setInputFechaFinValue] = useState('')
  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const {sedes, setSedes} = useFetchSedes({currentDepartamento})
  const [currentSede, setCurrentSede] = useState<Sede | null>(null)
  const [currentTipoFormacion, setCurrentTipoFormacion] = useState<string>('')
 
  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == '') setSedes([])
    setCurrentDepartamento(value)
  }

  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const sedeEncontrada = sedes.find(sede => sede.nombre == value)
    if(sedeEncontrada) setCurrentSede(sedeEncontrada) 
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
    setCurrentSede(null)
    setCurrentTipoFormacion('')
  }

  const crear = async () => {
    if(!inputNombreFormacionValue) return 
    if(!currentTipoFormacion) return
    if(!inputInstructoresValue) return
    if(!inputFechaInicioValue) return
    if(!inputFechaFinValue) return
    if(!inputHorarioValue) return
    if(!currentSede) return

    const formacion: Formacion = {
      nombre: inputNombreFormacionValue,
      numeroIdentificacion: 0,
      tipo: currentTipoFormacion,
      instructores: inputInstructoresValue,
      fechaInicio: inputFechaInicioValue,
      fechaFin: inputFechaFinValue,
      horario: inputHorarioValue,
      idSede: currentSede?.numeroIdentificacion
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

 

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form isEditing={true} onClicks={returnOnClicks()}  isCreating={true} title="Crear Formación">
          <div className='flex gap-4'>
            <div className='flex items-center w-full'>
              <Select onChange={selectDepartamento} title='Departamento' options={departamentos}/>
            </div>
            <div className='flex items-center w-full'>
              <Select onChange={selectSede} title='Sede' options={sedes.map(sede => sede.nombre)} />
            </div>
          </div>
          
          <div className='flex gap-4'>
            <Select onChange={selectTipoFormacion} width='w-full' title='Tipo' options={['Tegnologo', 'Tecnico']}/>
          </div>


          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <p>Nombre De Formación</p>
              <Input value={inputNombreFormacionValue} setValue={setInputNombreFormacionValue} type='text'/>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p>Instructores</p>
            <Input value={inputInstructoresValue} setValue={setInputInstructoresValue} type='text'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Horario</p>
            <Input value={inputHorarioValue} setValue={setInputHorarioValue} type='text'/>
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


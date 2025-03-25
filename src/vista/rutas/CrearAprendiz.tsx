import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { useEffect, useState } from 'react';
import { Select } from '../componentes/Select';
import { Aprendiz} from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchMunicipio } from '../hooks/useFetchMunicipio';
import { useFetchFormaciones } from '../hooks/useFetchFormaciones';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CrearAprendiz() {
  const navigate = useNavigate()
  const {localStorageData} = useLocalStorage()

  const [inputNombreValue, setInputNombreValue] = useState('')
  const [inputApellidosValue, setInputApellidosValue] = useState('')
  const [inputNumeroIdentificacionValue, setInputNumeroIdentificacionValue] = useState('')
  const [inputCelularValue, setInputCelularValue] = useState('')
  const [inputEmailValue, setInputEmailValue] = useState('')

  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const {municipios, setMunicipio} = useFetchMunicipio({currentDepartamento})
  const [currentMunicipio, setCurrentMunicipio] = useState<string>('')
  const {formaciones, setFormaciones} = useFetchFormaciones({currentMunicipio, municipios})
  const [currentFormacion, setCurrentFormacion] = useState<string>('')

  
  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentDepartamento(value)
  }

  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == '') {
      setCurrentMunicipio('')
      setFormaciones([])
    }else {
      setCurrentMunicipio(value)
    }
  }

  const selectFormacion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentFormacion(value) 
  }

  const limpiarFormulario = () => {
    setInputNombreValue('')
    setInputApellidosValue('')
    setInputNumeroIdentificacionValue('')
    setInputCelularValue('')
    setInputEmailValue('')
    setCurrentDepartamento('')
    setCurrentMunicipio('')
    setMunicipio([])
    setCurrentFormacion('')
  }

  const crear = async() => {
    if(!inputNombreValue) return 
    if(!inputApellidosValue) return 
    if(!inputNumeroIdentificacionValue) return 
    if(!inputCelularValue) return 
    if(!inputEmailValue) return 
    if(!currentFormacion) return 
    if(!formaciones) return 
    const aprendiz: Aprendiz = {
      nombre: inputNombreValue,
      apellidos: inputApellidosValue,
      numeroIdentificacion: inputNumeroIdentificacionValue,
      celular: inputCelularValue,
      email: inputEmailValue,
      idFormacion: formaciones.find(formacion => formacion.nombre == currentFormacion)?.numeroIdentificacion.toString() ?? null
    }
    const {status} = await axios.post('http://localhost:3000/aprendices', aprendiz)
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
        <Form isEditing={true} onClicks={returnOnClicks()}  isCreating={true} title="Crear Aprendiz">
          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <p>Nombre</p>
              <Input setValue={setInputNombreValue} value={inputNombreValue} type='text' placeholder='Sebastian'/>
            </div>
            <div className='flex flex-col w-full'>
              <p>Apellidos</p>
              <Input setValue={setInputApellidosValue} value={inputApellidosValue} type='text' placeholder='Ariza Diaz'/>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <p>N. Identificacion</p>
            <Input setValue={setInputNumeroIdentificacionValue} value={inputNumeroIdentificacionValue} type='text' placeholder='123456789'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Celular</p>
            <Input setValue={setInputCelularValue} value={inputCelularValue ?? ''} type='text' placeholder='3109999999'/>
          </div>
          <div className='flex flex-col w-full'>
            <p>Email</p>
            <Input setValue={setInputEmailValue} value={inputEmailValue ?? ''} type='text' placeholder='example@gmail.com'/>
          </div>


          <div className='flex gap-4'>
            <div className='flex items-center w-full'>
              <Select onChange={selectDepartamento} value={currentDepartamento} title='Departamento' options={departamentos}/>
            </div>
            <div className='flex items-center w-full'>
              <Select onChange={selectSede} title='Sede' options={municipios} />
            </div>
          </div>
          <div className='flex items-center w-full'>
            <Select onChange={selectFormacion} width='w-full' title='Formacion'  options={formaciones.map(formacion => formacion.nombre)}/>
          </div>  
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}


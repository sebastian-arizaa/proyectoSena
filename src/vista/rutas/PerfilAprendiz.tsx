import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { useEffect, useState } from 'react';
import { Select } from '../componentes/Select';
import { useParams } from 'react-router';
import useFetchAprendiz from '../hooks/useFetchAprendiz';
import { Sede } from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchSedes } from '../hooks/useFetchSedes';
import { useFetchFormaciones } from '../hooks/useFetchFormaciones';

export function PerfilAprendiz() {
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
  const [sedes] = useFetchSedes({currentDepartamento})
  const [currentSede, setCurrentSede] = useState<Sede | null>(null)
  const {formaciones} = useFetchFormaciones({currentSede, sedes})
  const [currentFormacion, setCurrentFormacion] = useState<string>('')

  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentDepartamento(value)
  }
  
  const selectSede = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const sedeEncontrada = sedes.find(sede => sede.nombre == value)
    if(sedeEncontrada) setCurrentSede(sedeEncontrada) 
  }


  // const rraa = () => {
  //   const myAprendiz: Aprendiz = {
  //     numeroIdentificacion: inputNumeroIdentificacionValue,
  //     nombre: inputNombreValue,
  //     apellidos: inputApellidosValue,
  //     celular: inputCelularValue,
  //     email: inputEmailValue,
  //     idFormacion: ''
  //   }

  //   console.log(myAprendiz)
  // }

  const toggleEdit = (isEditing: boolean) => {
    setIsEditing(isEditing)
  }

  const crear = () => {
    console.log('Procede a guardar')
  }

  const edit = () => {
    console.log('Procede a Actulizar')
    
  }

  const eliminar = () => {
    console.log('Procede a eliminar')
  }

  const returnOnClicks = () => {
    return {
      onClickCrear:  crear,     
      onClickActulizar:  edit,     
      onClickEliminar:  eliminar,     
    }
  }

  useEffect(()=> {
    setInputNombreValue(aprendiz.nombre)
    setInputApellidosValue(aprendiz.apellidos)
    setInputNumeroIdentificacionValue(aprendiz.numeroIdentificacion)
    setInputCelularValue(aprendiz.celular ?? '')
    setInputEmailValue(aprendiz.email ?? '')

    setCurrentDepartamento(aprendiz.nombreDepartamento)
  }, [aprendiz])
  
  useEffect(()=> {
    const sedeEncontrada = sedes.find(sede => sede.nombre == aprendiz.nombreSede)
    if(sedeEncontrada) setCurrentSede(sedeEncontrada)
  }, [sedes])

  useEffect(()=> {
    setCurrentFormacion(aprendiz.nombreFormacion)
  }, [currentSede])

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form  onClicks={returnOnClicks()} toggleEdit={toggleEdit} isCreating={false} isEditing={isEditing} title="Perfil Aprendiz">
          <div className='flex gap-4'>
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


          <div className='flex gap-4'>
            <div className='flex items-center w-full'>
              <Select value={currentDepartamento} onChange={selectDepartamento} title='Departamento' disabled={!isEditing} options={departamentos}/>
            </div>
            <div className='flex items-center w-full'>
              <Select value={currentSede?.nombre} onChange={selectSede} title='Sede' disabled={!isEditing} options={sedes.map(sede => sede.nombre)} />
            </div>
          </div>
          <div className='flex items-center w-full'>
            <Select value={currentFormacion} width='w-full' title='Formacion' disabled={!isEditing} options={formaciones.map(formacion => formacion.nombre)}/>
          </div>  
        </Form>
      </ContentLayout>
    </BaseLayout>
  )
}


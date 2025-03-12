import { useEffect, useState } from 'react';
import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Form } from '../componentes/Form';
import { Select } from '../componentes/Select';
import { useParams } from 'react-router';
import useFetchAdministrador from '../hooks/useFetchAdministrador';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { AdminDepartamento, AdminSedeCompleto, Sede, Tipo } from '../types';
import { useFetchSedes } from '../hooks/useFetchSedes';

export function PerfilAdministrador() {
  const {numeroIdentificacion, tipo} = useParams<{numeroIdentificacion: string, tipo: Tipo}>()
  const [administrador] = useFetchAdministrador({numeroIdentificacion, tipo})
  console.log('🚀 ~ PerfilAdministrador ~ administrador:', administrador)


  const [inputNombreValue, setInputNombreValue] = useState('')
  const [inputApellidosValue, setInputApellidosValue] = useState('')
  const [inputNumeroIdentificacionValue, setInputNumeroIdentificacionValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')

  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  const {sedes, setSedes} = useFetchSedes({currentDepartamento, tipo})
  const [currentSede, setCurrentSede] = useState<Sede | null>(null)



  useEffect(()=> {
    setInputNombreValue(administrador?.nombre)
    setInputApellidosValue(administrador?.apellidos)
    setInputNumeroIdentificacionValue(administrador?.numeroIdentificacion)
    setInputPasswordValue(administrador?.password)
    if(tipo == 'Departamento') {
      setCurrentDepartamento((administrador as AdminDepartamento)?.nombreDepartamento)
    }else if(tipo == 'Sede') {
      setCurrentDepartamento((administrador as AdminSedeCompleto).nombreDepartamento)
    }
    
  }, [administrador])

  useEffect(()=> {
    if(tipo == 'Sede') {
      const sedeEncontrada = sedes.find(sede => sede.nombre == (administrador as AdminSedeCompleto).nombreSede)
      if(sedeEncontrada) setCurrentSede(sedeEncontrada)
    }
  }, [sedes])


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


  const [isEditing, setIsEditing] = useState(false)

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
      onClickCrear: crear,     
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
          <Select disabled={!isEditing} value={currentSede?.nombre} onChange={selectSede} title='Sede' options={sedes.map(sede => sede.nombre)} />
        </div>
      </div>
    )
    return <></>
  }

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <Form onClicks={returnOnClicks()} toggleEdit={toggleEdit} isCreating={false} isEditing={isEditing}  title="Perfil Administrador">
          <div className='flex gap-4'>
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

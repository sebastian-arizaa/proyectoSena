import React, { useEffect, useState } from 'react';
import { Button } from '../componentes/Button';
import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Select } from '../componentes/Select';
import Table from '../componentes/Table';
import { Sede } from '../types';
import { useFetchDepartamentos } from '../hooks/useFetchDepartamentos';
import { useFetchMunicipio } from '../hooks/useFetchMunicipio';
import { useFetchFormaciones } from '../hooks/useFetchFormaciones';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';


export function Datos() {
  const navigate = useNavigate()
  const {localStorageData} = useLocalStorage()

  const [departamentos] = useFetchDepartamentos()
  const [currentDepartamento, setCurrentDepartamento] = useState<string>('')
  console.log('🚀 ~ Datos ~ currentDepartamento:', currentDepartamento)
  const {municipios} = useFetchMunicipio({currentDepartamento})
  // console.log('🚀 ~ Datos ~ municipio:', municipios)
  const [currentMunicipio, setCurrentMunicipio] = useState<string>('')
  console.log('🚀 ~ Datos ~ currentMunicipio:', currentMunicipio)
  const {formaciones, formacionesFiltradas, setFormacionesFiltradas} = useFetchFormaciones({currentMunicipio, municipios})
  const [inputFormacionValue, setInputFormacionValue] = useState('')

  const selectDepartamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentDepartamento(value)
  }

  const selectMunicipio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == '') {
      setCurrentMunicipio('')
      setFormacionesFiltradas([])
    }else {
      console.log(value)
      setCurrentMunicipio(value)
      // const sedeEncontrada = sedes.find(sede => sede.nombre == value)
      // if(sedeEncontrada) setCurrentSede(sedeEncontrada) 
    }
  }

  const searchFormacion = () => {
    const filtradas = formaciones.filter(formacion => formacion.nombre.toLocaleLowerCase().includes(inputFormacionValue.toLocaleLowerCase()))
    setFormacionesFiltradas(filtradas)
  }

  useEffect(()=> {
    if(!localStorageData.isLogged) navigate('/ingresar')
  }, [])

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <div className='flex flex-col w-full h-full'>
          <div className='flex items-end gap-4 py-4'>
            <Select onChange={selectDepartamento} title='Departamento' options={departamentos}/>
            <Select value={currentMunicipio} onChange={selectMunicipio} title='Municipio' options={municipios}/>
            <div className='flex items-center gap-2 w-2/6 max-w-[500px] h-14'>
              <p className='flex items-center w-min'>Formacion:</p>
              <div className='w-full'>
                <Input value={inputFormacionValue} setValue={setInputFormacionValue} type='text'/>
              </div>
              <Button onClick={searchFormacion} type='primary'>Buscar</Button>
            </div>
            <div className='flex items-center h-full'>
             <Button onClick={() => navigate('/crearformacion')} type='primary'>Crear</Button>
            </div>
          </div>
          <Table type='formacion' itemsProps={formacionesFiltradas}/>
        </div>
      </ContentLayout>
    </BaseLayout>
  )
}
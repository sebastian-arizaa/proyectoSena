import {/*  useEffect,  */useState } from 'react';
import { Button } from '../componentes/Button';
import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import { Select } from '../componentes/Select';
import Table from '../componentes/Table';
import useFetchAdministradores from '../hooks/useFetchAdministradores';
import { Tipo } from '../types';


export function Administradores() {
  const [tipo, setTipo] = useState<Tipo>('')
  const {administradores, administradoresFiltrados, setAdministradoresFiltrados} = useFetchAdministradores({tipo})
  const [inputAdministradorValue, setInputFormacionValue] = useState('')

  const returnTipo = () => {
    if(tipo == 'Departamento') return 'adminDepartamento'
    if(tipo == 'Sede') return 'adminSede'
    return ''
  }

  const selectTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value == 'Departamento' || value == 'Sede' || value == '') setTipo(value)
  }

  const filtrarAdministradoresPorNombre = async() => {
    const data = administradores.filter(admin => admin.nombre.toLowerCase().includes(inputAdministradorValue.toLowerCase()))
    setAdministradoresFiltrados(data)
  }
  
  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <div className='flex flex-col w-full h-full'>
          <div className='flex items-end gap-4 py-4'>
            <Select onChange={selectTipo} title='Tipo' options={['Departamento', 'Sede']}/>
            <div className='flex items-center gap-2 w-2/6 max-w-[500px] h-14'>
              <p className='flex items-center w-min'>Nombre:</p>
              <div className='w-full'>
                <Input setValue={setInputFormacionValue} type='text'/>
              </div>
              <Button onClick={filtrarAdministradoresPorNombre} type='primary'>Buscar</Button>
            </div>
          </div>
          <Table type={returnTipo()} itemsProps={administradoresFiltrados}/>
      </div>
      </ContentLayout>
    </BaseLayout>
  )
}

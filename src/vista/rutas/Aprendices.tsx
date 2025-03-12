import { useNavigate, useParams } from 'react-router';
import { Button } from '../componentes/Button';
import { Input } from '../componentes/Input';
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';
import Table from '../componentes/Table';
import { useState } from 'react';
import useFetchAprendices from '../hooks/useFetchAprendices';

export function Aprendices() {
  const navigate = useNavigate()
  const {idFormacion} = useParams()
  const {aprendices, aprendicesFiltrados, setAprendicesFiltrados} = useFetchAprendices({idFormacion: Number(idFormacion)})
  const [inputNombreValue, setInputNombreValue] = useState('')

  const filtrarAprendices = () => {
    const filtrados = aprendices.filter(aprendiz => aprendiz.nombre.toLowerCase().includes(inputNombreValue.toLowerCase()))
    setAprendicesFiltrados(filtrados)
  }

  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <div className='flex flex-col w-full h-full'>
          <div className='flex items-end gap-4 py-4'>
            <div className='flex items-center gap-2 w-2/6 max-w-[500px] h-14'>
              <p className='flex items-center w-min'>Nombre:</p>
              <div className='w-full'>
                <Input setValue={setInputNombreValue}  type='text'/>
              </div>
              <Button onClick={filtrarAprendices} type='primary'>Buscar</Button>
            </div>
            <div className='flex items-center h-full'>
             <Button onClick={() => navigate('/crearaprendiz')} type='primary'>Crear</Button>
            </div>
          </div>
          <Table type='aprendices' itemsProps={aprendicesFiltrados}/>
        </div>
      </ContentLayout>
    </BaseLayout>
  )
}

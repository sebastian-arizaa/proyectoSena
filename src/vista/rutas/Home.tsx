// import { Button } from '../componentes/Button'
// import { Input } from '../componentes/Input'
import { BaseLayout } from '../componentes/layouts/BaseLayout'
import { ContentLayout } from '../componentes/layouts/ContentLayout'
import { MenuContainer } from '../componentes/MenuContainer'
// import { Select } from '../componentes/Select'
// import Table from '../componentes/Table'

export function Home() {
  return (
    <BaseLayout>
      <ContentLayout>
        {/* <div className='w-full h-full'> */}
          <MenuContainer/>
          {/* <div className='flex flex-col w-full h-full'>
            <div className='flex items-end gap-4 py-4'>
              <Select title='Departamento' options={['Santander', 'Bogota']}/>
              <Select title='Sede' options={['Barbosa', 'Velez', 'Puente Araujo']}/>
              <div className='flex items-center gap-2 w-2/6 max-w-[500px] h-14'>
                <p className='flex items-center w-min'>Formacion: </p>
                <div className='w-full'>
                  <Input type='text'/>
                </div>
                <Button type='primary'>Buscar</Button>
              </div>
            </div>
            <Table/>
          </div> */}
        {/* </div> */}
      </ContentLayout>
    </BaseLayout>
  )
}
import { useState } from 'react'
import { IngresarInput } from '../componentes/InputIngresar'
import { Button } from '../componentes/Button'
import { FaUserAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router'
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';

export function Ingresar() {
  const navigate = useNavigate()
  const [adminButtons, setAdminButtons] = useState([
    {nombre: 'root', isActive: false},
    {nombre: 'Departamento', isActive: false},
    {nombre: 'Sede', isActive: true}
  ])

  const activeButton = (index: number) => {
    const buttonCopy = [...adminButtons]
    buttonCopy.forEach(button => button.isActive = false)
    buttonCopy[index].isActive = true
    setAdminButtons(buttonCopy)
  }

  const goToHome  = () => {
    navigate('/formaciones')
  }

  return (
    <BaseLayout>
      <ContentLayout>
        <div className='flex justify-center h-full pt-24'>
          <div className=' w-1/2 min-w-[300px] max-w-[400px] h-min min-h-[300px] rounded-sm shadow-lg overflow-hidden'>
            <div className='py-2 px-4 bg-primary'>
              <p className='text-2xl text-center text-white font-semibold'>Ingreso al sistema</p>
            </div>
            <div className='flex flex-col gap-4 p-4 pt-8'>
              <div className='flex gap-2'>
                {adminButtons.map((button, index)=> 
                  <Button 
                    type='secondary'
                    key={index} 
                    isActive={button.isActive}
                    onClick={()=>activeButton(index)} 
                  >
                    {button.nombre}
                  </Button>
                )}
              </div>
              <IngresarInput type="text" Icon={FaUserAlt} iconColor={'white'}/>
              <IngresarInput type="password" Icon={FaLock} iconColor={'white'}/>
              <Button type='primary' onClick={()=> goToHome()}>Ingresar</Button>
            </div>
          </div>
        </div>
      </ContentLayout>
    
    </BaseLayout>
  )
}
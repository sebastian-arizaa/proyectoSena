import { useState } from 'react'
import { IngresarInput } from '../componentes/InputIngresar'
import { Button } from '../componentes/Button'
import { FaUserAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router'
import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import axios from 'axios';
// import { useLocalStorage } from '../hooks/useLocalStorage';

export function Ingresar() {
  const navigate = useNavigate()
  // const {localStorageData, saveItemData: setLocalStorage} = useLocalStorage()

  const [adminButtons, setAdminButtons] = useState([
    {nombre: 'root', isActive: false},
    {nombre: 'Departamento', isActive: false},
    {nombre: 'Sede', isActive: true}
  ])
  const [inputNumeroIdentificacionValue, setInputNumeroIdentificacionValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const activeButton = (index: number) => {
    const buttonCopy = [...adminButtons]
    buttonCopy.forEach(button => button.isActive = false)
    buttonCopy[index].isActive = true
    setAdminButtons(buttonCopy)
  }

  const ingresar  = async() => {
    const [adminRootBtn, adminDepartamentoBtn, adminSedeBtn] = adminButtons
    if(!inputNumeroIdentificacionValue) return
    if(!inputPasswordValue) return

    let adminData = {numeroIdentificacion: null}
    if(adminRootBtn.isActive) {
      const {data} = await axios(`${API_URL}/adminroot/por-ingresar/${inputNumeroIdentificacionValue}/${inputPasswordValue}`)
      adminData = data[0]
    }else if (adminDepartamentoBtn.isActive) {
      const {data} = await axios(`${API_URL}/admindepartamento/por-ingresar/${inputNumeroIdentificacionValue}/${inputPasswordValue}`)
      adminData = data[0]
    }else if(adminSedeBtn.isActive) {
      const {data} = await axios(`${API_URL}/adminsede/por-ingresar/${inputNumeroIdentificacionValue}/${inputPasswordValue}`)
      adminData = data[0]
    }

    if(adminData.numeroIdentificacion){
      // setLocalStorage('proyectoSena', {isLogged: true})
      navigate('/formaciones')
    } 
  }

  // useEffect(()=> {
  //   if(localStorageData.isLogged) navigate('/formaciones')
  // }, [])

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
              <IngresarInput value={inputNumeroIdentificacionValue} setValue={setInputNumeroIdentificacionValue} type="text" Icon={FaUserAlt} iconColor={'white'}/>
              <IngresarInput value={inputPasswordValue} setValue={setInputPasswordValue} type="password" Icon={FaLock} iconColor={'white'}/>
              <Button type='primary' onClick={()=> ingresar()}>Ingresar</Button>
            </div>
          </div>
        </div>
      </ContentLayout>
    
    </BaseLayout>
  )
}
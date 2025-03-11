import { useState } from 'react';
import { Menu } from './Menu';
import MenuButton from './MenuButton';

export function MenuContainer() {
  // console.log('Renderiza MenuContainer')

  const [isMenuActive, setIsMenuActive] = useState(false)
  
  return (
    <>
    <div className={`absolute left-0 top-0 w-full h-full ${isMenuActive ? 'visible bg-secondary/40' : 'invisible'}`}>
    </div>
    <div className={`absolute left-0 flex items-center gap-1 h-full w-1/5 min-w-[300px] max-w-[400px] transition-transform  ${!isMenuActive ? '-translate-x-[90%]' : '' }`}>
      <Menu/>
      <MenuButton onClick={()=> setIsMenuActive(!isMenuActive)}/>
    </div>
    </>
  )
}

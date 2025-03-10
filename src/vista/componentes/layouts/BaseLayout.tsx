import React, { useEffect } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Advertencia } from '../Advertencia'

interface Props {
  children:  React.JSX.Element
}

export function BaseLayout({children}: Props) {
  console.log('Renderiza BaseLayout')
  const isDeleting = false
  useEffect(()=> {
    console.log('Termina de renderizar baseLayout')
  })
  return (
    <div className='relative flex flex-col justify-between h-screen'>
      {isDeleting && <Advertencia/>}
      <Navbar />
        {children}
      <Footer/>
    </div>
  )
}

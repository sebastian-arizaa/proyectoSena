import React from 'react'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
// import { Advertencia } from '../Advertencia'

interface Props {
  children:  React.JSX.Element
}

export function BaseLayout({children}: Props) {
  // const isDeleting = false
  return (
    <div className='relative flex flex-col justify-between h-screen'>
      {/* {isDeleting && <Advertencia/>} */}
      <Navbar />
        {children}
      <Footer/>
    </div>
  )
}

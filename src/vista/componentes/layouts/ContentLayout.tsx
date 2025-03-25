import React from 'react'
// import { Notificacion } from '../Notificacion'

interface Props {
  children: React.JSX.Element | React.JSX.Element[]
}

export function ContentLayout({children}: Props) {
  return (
    <div className='relative h-full overflow-y-auto px-[5%]'>
      {/* <Notificacion message='Usuario Eliminado'/> */}
      <div className='w-full h-full overflow-y-auto px-4'>
        {(children as React.JSX.Element[]).length ? [...(children as React.JSX.Element[])] : children}
      </div>
    </div>
  )
}

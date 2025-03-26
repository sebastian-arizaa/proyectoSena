import React from 'react'

interface Props {
  children:  React.JSX.Element
}

export function BaseLayout({children}: Props) {
  return (
    <div className='relative flex flex-col justify-between h-screen'>
        {children}
    </div>
  )
}

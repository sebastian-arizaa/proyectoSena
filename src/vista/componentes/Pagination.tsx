import React from 'react'

export function Pagination() {
  
  return (
    <div className='flex items-center justify-center gap-2 w-full p-4'>
        <button className='flex items-center justify-center w-5 h-5 rounded-full cursor-pointer text-secondary-text bg-secondary hover:bg-secondary-hover active:bg-secondary'>1</button>
        <button className='flex items-center justify-center w-5 h-5 rounded-full cursor-pointer text-secondary-text bg-secondary hover:bg-secondary-hover active:bg-secondary'>2</button>
        <button className='flex items-center justify-center w-5 h-5 rounded-full cursor-pointer text-secondary-text bg-secondary hover:bg-secondary-hover active:bg-secondary'>3</button>
    </div>
  )
}

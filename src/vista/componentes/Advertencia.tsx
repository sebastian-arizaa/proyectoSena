import { Button } from './Button'

export function Advertencia() {
  return (
    <div className='absolute z-20 top-0 left-0 flex justify-center items-center w-full h-full bg-black/70'>
      <div className='flex flex-col items-center gap-4 py-4 px-8 bg-third rounded'>
        <h2 className='text-2xl font-semibold'>Eliminando</h2>
        <p>Seguro que quieres eliminar</p>
        <div className='flex justify-center gap-4 w-full'>
           <Button styles='w-full' type='primary'>Si</Button>
           <Button styles='w-full' type='cancel'>No</Button>
        </div>
      </div>
    </div>
  )
}

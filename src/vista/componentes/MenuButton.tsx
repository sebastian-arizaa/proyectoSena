import { FaGripLinesVertical } from 'react-icons/fa';

interface Props {
  onClick: ()=> void
}

export default function MenuButton({onClick}: Props) {
  return (
    // <div className='absolute left-4 top-1/2 -translate-y-full hover:scale-105'>
    <div className='hover:scale-105'>
      <FaGripLinesVertical onClick={onClick} fill='oklch(0.707 0.022 261.325)' className='cursor-pointer h-8'/>
    </div>
  )
}

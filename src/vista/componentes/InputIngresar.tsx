import type {IconType} from 'react-icons'

interface Props {
  type: 'password' | 'text',
  Icon: IconType,
  iconColor: string
}

export function IngresarInput({type, Icon, iconColor}: Props) {
  
  return (
    <div className='flex'>
      <div className='flex justify-center items-center w-2/12 min-w-[20px] rounded-l-sm  bg-primary'>
        <Icon fill={iconColor} />
      </div>
      <input className='w-full pl-2  py-1 border rounded-r-sm border-l-0 outline-0' type={type}/>
    </div>
  )
}
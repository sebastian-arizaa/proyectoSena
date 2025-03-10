interface Props {
  children: string,
  isActive?: boolean,
  styles?: string,
  type?: 'primary' | 'secondary' | 'third' | 'cancel',
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void,
}

export function Button({children, type, isActive, styles, onClick}: Props) {
  let typeStyles = ''
  let activeStyles = ''
  switch(type) {
    case 'primary':
      typeStyles = 'bg-primary text-primary-text hover:bg-primary-hover active:bg-primary'
      activeStyles = 'bg-primary-focus!'
      break 
    case 'secondary':
      typeStyles =  'bg-secondary hover:bg-secondary-hover active:bg-secondary'
      activeStyles = 'bg-secondary-focus!'
      break
    case 'third':
      typeStyles = 'text-secondary-text bg-third hover:bg-third-hover active:bg-third'
      activeStyles = 'bg-third-hover'
      break
    case 'cancel':
      typeStyles = 'text-primary-text bg-red-400 hover:bg-red-500 active:bg-red-400'
      activeStyles = 'bg-red-500'
      break
    default:
  }
  
  return <button 
    className={`py-1 px-2 rounded cursor-pointer  font-semibold 
      ${typeStyles}
      ${isActive ? activeStyles : ''}
      ${styles}
    ` }
      onClick={onClick}
    >{children}</button>
}
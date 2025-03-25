interface Props {
  children: string,
  isActive?: boolean,
  styles?: string,
  type?: 'primary' | 'secondary' | 'third' | 'cancel',
  disabled?: boolean,
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void,
}

export function Button({children, type, isActive, styles, disabled, onClick}: Props) {
  let typeStyles = ''
  let activeStyles = ''
  let disabledStyles = ''
  switch(type) {
    case 'primary':
      typeStyles = 'bg-primary text-primary-text hover:bg-primary-hover active:bg-primary'
      activeStyles = 'bg-primary-focus!'
      disabledStyles = 'opacity-55 hover:bg-primary! cursor-not-allowed!'
      break 
    case 'secondary':
      typeStyles =  'bg-secondary hover:bg-secondary-hover active:bg-secondary'
      activeStyles = 'bg-secondary-focus!'
      disabledStyles = 'opacity-55 hover:bg-secondary! cursor-not-allowed!'

      break
    case 'third':
      typeStyles = 'text-secondary-text bg-third hover:bg-third-hover active:bg-third'
      activeStyles = 'bg-third-hover'
      disabledStyles = 'opacity-55 hover:bg-third! cursor-not-allowed!'
      break
    case 'cancel':
      typeStyles = 'text-primary-text bg-red-400 hover:bg-red-500 active:bg-red-400'
      activeStyles = 'bg-red-500'
      disabledStyles = 'opacity-55 hover:bg-red-500! cursor-not-allowed!'
      break
    default:
  }
  
  return <button 
    disabled={disabled}
    className={`py-1 px-2 rounded cursor-pointer  font-semibold 
      ${typeStyles}
      ${isActive ? activeStyles : ''}
      ${styles}
      ${disabled ? disabledStyles : ''}
    ` }
      onClick={onClick}
    >{children}</button>
}
interface Props {
  type: 'text' | 'password' | 'date',
  disabled?: boolean,
  value?: string,
  setValue?: (value: string) => void
  styles?: string,
  placeholder?: string
}

export function Input({type, disabled, value, setValue, styles, placeholder=''}: Props) {
  return (
    <input 
      value={value}
      onChange={({currentTarget})=> setValue && setValue(currentTarget.value)}
      placeholder={placeholder}
      disabled={disabled} 
      className={`
        w-full pl-2 py-1 shadow-sm border-2 border-gray-400 rounded outline-0 
        ${styles? styles : ''} ${disabled? 'opacity-60' : ''}
      `} 
      type={type == 'date' ?  disabled? 'text' : type : type}
    />
  )
}

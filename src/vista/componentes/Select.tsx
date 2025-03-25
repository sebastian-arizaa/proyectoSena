interface Props {
  title?: string,
  disabled?: boolean,
  styles?: string,
  width?: string,
  options?: string[],
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({title, disabled, styles, width, options=[], value, onChange}: Props) {
  console.log('🚀 ~ Select ~ value:', value)
  return (
    <div className={`flex gap-2 w-2/6 max-w-[300px] h-14 ${width}`}>
      <p className='flex items-center w-min'>{title ?  `${title}:` : title}</p>
      <select value={value} onChange={onChange}
        disabled={disabled}
        className={`w-2/3 min-w-[120px]  text-ellipsis border-b-2 border-b-black outline-0 
          ${disabled ? 'opacity-60' : ''}
          ${styles}
        `}
      >
        ${!disabled && <option value="">{`Seleccione  ${title? title : ''}`}</option>}
        {options.map((option, index) => <option className="w-[100px] text-ellipsis whitespace-nowrap overflow-hidden" key={index} value={option}>{option}</option>)}
      </select>
    </div>
  )
}

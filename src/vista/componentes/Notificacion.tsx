interface Props {
  message: string,
}

export function Notificacion({message}: Props) {

  return (
    <div className='absolute -top-1 left-1/2 p-4 px-8 rounded bg-primary text-primary-text font-semibold shadow-lg -translate-x-1/2 -translate-y-full animate-notif'>
      <p>{message}</p>
    </div>
  )
}

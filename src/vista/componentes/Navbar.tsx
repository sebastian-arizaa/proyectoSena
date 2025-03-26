import senaLogo from '../assets/logo_sena_sgva.png'

export function Navbar() {
  return (
    <nav  className='relative z-10 flex justify-between py-2 px-4 border-b-4 border-b-primary bg-white'>
      <img className="h-26 max-sm:h-18" src={senaLogo} alt="Logo sena" />
    </nav>
  )
}
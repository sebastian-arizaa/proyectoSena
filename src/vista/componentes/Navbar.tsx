export function Navbar() {
  return (
    <nav  className='relative z-10 flex justify-between py-2 px-4 border-b-4 border-b-primary bg-white'>
      {/* <img src="https://caprendizaje.sena.edu.co/sgva/SGVA_Diseno/Recursos/imagenes/logo_sena_sgva.png" alt="Logo sena" /> */}
      {/* <img src="../../assets/logo_sena_sgva.png" alt="Logo sena" /> */}
      <img className="h-26" src="src/assets/logo_sena_sgva.png" alt="Logo sena" />
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b p-2 px-4 bg-primary">
        <h1 className="text-2xl text-primary-text">Formaciones</h1>
      </div> */}
    </nav>
  )
}
import { HashRouter, Route, Routes} from 'react-router-dom'
import { Ingresar } from './rutas/Ingresar'
import { Formaciones } from './rutas/Formaciones'
import { Perfil } from './rutas/Perfil'
import { Administradores } from './rutas/Administradores'
import { CerraSesion } from './rutas/CerraSesion'
import { PerfilAprendiz } from './rutas/PerfilAprendiz'
import { PerfilAdministrador } from './rutas/PerfilAdministrador'
import { PerfilFormacion } from './rutas/PerfilFormacion'
import { Aprendices } from './rutas/Aprendices'
import { CrearAdministrador } from './rutas/CrearAdministrador'
import { CrearAprendiz } from './rutas/CrearAprendiz'
import { CrearFormacion } from './rutas/CrearFormacion'
import { Navbar } from './componentes/Navbar'
import { Footer } from './componentes/Footer'

function App() {
  return (
    <>
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='/ingresar' element={<Ingresar/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
          <Route path='/perfiladministrador/:tipo/:numeroIdentificacion' element={<PerfilAdministrador/>}/>
          <Route path='/perfilaprendiz/:numeroIdentificacion' element={<PerfilAprendiz/>}/>
          <Route path='/perfilformacion/:numeroIdentificacion' element={<PerfilFormacion/>}/>
          <Route path='/crearadministrador' element={<CrearAdministrador/>}/>
          <Route path='/crearformacion' element={<CrearFormacion/>}/>
          <Route path='/crearaprendiz' element={<CrearAprendiz/>}/>
          <Route path='/formaciones' element={<Formaciones/>}/>
          <Route path='/aprendices/:idFormacion' element={<Aprendices/>}/>
          <Route path='/administradores' element={<Administradores/>}/>
          <Route path='/cerrarsesion' element={<CerraSesion/>}/>
          <Route path="*" element={<Formaciones/>}/>
        </Routes>
        <Footer/>
      </HashRouter>
    </>
  )
}

export default App
import { HashRouter, Route, Routes} from 'react-router-dom'
import { Ingresar } from './rutas/Ingresar'
import { Datos } from './rutas/Formaciones'
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

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/ingresar' element={<Ingresar/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
          <Route path='/perfiladministrador/:tipo/:numeroIdentificacion' element={<PerfilAdministrador/>}/>
          <Route path='/perfilaprendiz/:numeroIdentificacion' element={<PerfilAprendiz/>}/>
          <Route path='/perfilformacion/:numeroIdentificacion' element={<PerfilFormacion/>}/>
          <Route path='/crearadministrador' element={<CrearAdministrador/>}/>
          <Route path='/crearformacion' element={<CrearFormacion/>}/>
          <Route path='/crearaprendiz' element={<CrearAprendiz/>}/>
          <Route path='/formaciones' element={<Datos/>}/>
          <Route path='/aprendices/:idFormacion' element={<Aprendices/>}/>
          <Route path='/administradores' element={<Administradores/>}/>
          <Route path='/cerrarsesion' element={<CerraSesion/>}/>
          <Route path="*" element={<p>Pagina no encontrada</p>}/>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
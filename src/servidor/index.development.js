import express from 'express'
import cors from 'cors'
import { adminDepartamentoRouter } from './rutas/admindepartamento.js'
import { adminRootRouter } from './rutas/adminroot.js'
import { adminSedeRouter } from './rutas/adminsede.js'
import { formacionesRouter } from './rutas/formaciones.js'
import { aprendicesRouter } from './rutas/aprendices.js'
import { PORT } from './config.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/adminroot', adminRootRouter)
app.use('/admindepartamento', adminDepartamentoRouter)
app.use('/adminsede', adminSedeRouter)
app.use('/formaciones', formacionesRouter)
app.use('/aprendices', aprendicesRouter)

app.listen(PORT, () => {
  console.log('Listening http://localhost:'+PORT)
})
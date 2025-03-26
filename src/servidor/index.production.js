import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { adminDepartamentoRouter } from './rutas/admindepartamento.js'
import { adminRootRouter } from './rutas/adminroot.js'
import { adminSedeRouter } from './rutas/adminsede.js'
import { formacionesRouter } from './rutas/formaciones.js'
import { aprendicesRouter } from './rutas/aprendices.js'
import { PORT } from './config.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const app = express()

app.use(cors())
app.use(express.json())

app.use('/adminroot', adminRootRouter)
app.use('/admindepartamento', adminDepartamentoRouter)
app.use('/adminsede', adminSedeRouter)
app.use('/formaciones', formacionesRouter)
app.use('/aprendices', aprendicesRouter)

app.use(express.static(path.join(__dirname, "..")))

app.use('*', (req, res) => {
  console.log("Carga index.html")
  console.log(path.join(__dirname, "..") )
  res.sendFile(path.join(__dirname, "../index.html"))
})


app.listen(PORT, () => {
  console.log('Listening http://localhost:'+PORT)
})
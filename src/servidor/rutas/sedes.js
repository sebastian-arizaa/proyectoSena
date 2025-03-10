import {Router} from "express"
import { ControladorSedes } from "../../controlador/sedes.js"

export const sedesRouter = Router()

sedesRouter.get("/todos", ControladorSedes.traerTodos)
sedesRouter.get("/uno/:numeroIdentificacion", ControladorSedes.traerUno)
sedesRouter.get("/por-departamento/:nombreDepartamento", ControladorSedes.traerPorDepartamento)
sedesRouter.delete("/:numeroIdentificacion", ControladorSedes.eliminar)
sedesRouter.post("/", ControladorSedes.agregar)
sedesRouter.patch("/:numeroIdentificacion", ControladorSedes.actualizar)
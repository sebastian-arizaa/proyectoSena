import {Router} from "express"
import { ControladorFormaciones } from "../../controlador/formaciones.js"

export const formacionesRouter = Router()

formacionesRouter.get("/todos", ControladorFormaciones.traerTodos)
formacionesRouter.get("/uno/:numeroIdentificacion", ControladorFormaciones.traerUno)
formacionesRouter.get("/por-sede/:numeroIdentificacionSede", ControladorFormaciones.traerPorSede)
formacionesRouter.get("/por-nombre/:nombre", ControladorFormaciones.traerPorNombre)
formacionesRouter.get("/uno/completo/:numeroIdentificacion", ControladorFormaciones.traerCompleto)
formacionesRouter.delete("/:numeroIdentificacion", ControladorFormaciones.eliminar)
formacionesRouter.post("/", ControladorFormaciones.agregar)
formacionesRouter.patch("/:numeroIdentificacion", ControladorFormaciones.actualizar)
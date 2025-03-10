import {Router} from "express"
import { ControladorAprendices } from "../../controlador/aprendices.js"

export const aprendicesRouter = Router()

aprendicesRouter.get("/todos", ControladorAprendices.traerTodos)
aprendicesRouter.get("/uno/:numeroIdentificacion", ControladorAprendices.traerUno)
aprendicesRouter.get("/por-formacion/:numeroIdentificacionFormacion", ControladorAprendices.traerPorFormacion)
aprendicesRouter.get("/uno/completo/:numeroIdentificacionFormacion", ControladorAprendices.traerCompleto)
aprendicesRouter.delete("/:numeroIdentificacion", ControladorAprendices.eliminar)
aprendicesRouter.post("/", ControladorAprendices.agregar)
aprendicesRouter.patch("/:numeroIdentificacion", ControladorAprendices.actualizar)
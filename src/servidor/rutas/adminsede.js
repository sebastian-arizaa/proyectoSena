import {Router} from "express"
import { ControladorAdminSede } from "../../controlador/adminsede.js"

export const adminSedeRouter = Router()

adminSedeRouter.get("/todos", ControladorAdminSede.traerTodos)
adminSedeRouter.get("/por-ingresar/:numeroIdentificacion/:password", ControladorAdminSede.traerPorIngresar)
adminSedeRouter.get("/uno/:numeroIdentificacion", ControladorAdminSede.traerUno)
adminSedeRouter.get("/por-nombre/:nombre", ControladorAdminSede.traerUno)
// adminSedeRouter.get("/uno/completo/:numeroIdentificacion", ControladorAdminSede.traerCompleto)
adminSedeRouter.delete("/:numeroIdentificacion", ControladorAdminSede.eliminar)
adminSedeRouter.post("/", ControladorAdminSede.agregar)
adminSedeRouter.patch("/:numeroIdentificacion", ControladorAdminSede.actualizar)
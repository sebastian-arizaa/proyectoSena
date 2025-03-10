import {Router} from "express"
import { ControladorAdminRoot } from "../../controlador/adminroot.js"

export const adminRootRouter = Router()

adminRootRouter.get("/por-ingresar/:numeroIdentificacion/:password", ControladorAdminRoot.traerPorIngresar)
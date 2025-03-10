import { Router } from "express";
import { ControladorAdminDepartamento } from "../../controlador/admindepartamento.js";

export const adminDepartamentoRouter = Router()

adminDepartamentoRouter.get("/todos", ControladorAdminDepartamento.traerTodos)
adminDepartamentoRouter.get("/por-ingresar/:numeroIdentificacion/:password", ControladorAdminDepartamento.traerPorIngresar)
adminDepartamentoRouter.get("/uno/:numeroIdentificacion", ControladorAdminDepartamento.traerUno)
adminDepartamentoRouter.get("/por-nombre/:nombre", ControladorAdminDepartamento.traerUno)
adminDepartamentoRouter.delete("/:numeroIdentificacion", ControladorAdminDepartamento.eliminar)
adminDepartamentoRouter.post("/", ControladorAdminDepartamento.agregar)
adminDepartamentoRouter.patch("/:numeroIdentificacion", ControladorAdminDepartamento.actualizar)
import { AdminDepartamento } from "../modelo/admindepartamento.js"

export class ControladorAdminDepartamento {
  static async traerTodos (req, res) {
    console.log("Llega a traer todos")
    const data = await AdminDepartamento.traerTodos()
    console.log("🚀 ~ ControladorAdminDepartamento ~ traerTodos ~ data:", data)
    res.json(data)
  }

  static async traerUno (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await AdminDepartamento.traerUno(numeroIdentificacion)
    res.json(data)
  }

  static async traerPorIngresar(req, res) {
    const {numeroIdentificacion, password} = req.params
    const data = await AdminDepartamento.traerPorIngresar(numeroIdentificacion, password)
    res.json(data)
  }
  
  static async traerPorNombre(req, res) {
    const {nombre} = req.params
    const data = await AdminDepartamento.traerPorNombre(nombre)
    res.json(data)
  }

  static async eliminar (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await AdminDepartamento.eliminar(numeroIdentificacion)
    res.json(data)
  }

  static async agregar (req, res) {
    const adminDepartamento = req.body
    const data = await AdminDepartamento.agregar(adminDepartamento)
    res.json(data)
  }

  static async actualizar (req, res) {
    const {numeroIdentificacion} = req.params
    const adminDepartamento = req.body
    const data = await AdminDepartamento.actualizar(adminDepartamento, numeroIdentificacion)
    res.json(data)
  }
}
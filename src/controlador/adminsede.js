import { AdminSede } from "../modelo/adminsede.js";

export class ControladorAdminSede {
  static async traerTodos (req, res) {
    const data = await AdminSede.traerTodos()
    res.json(data)
  }

  static async traerUno (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await AdminSede.traerUno(numeroIdentificacion)
    res.json(data)
  }

  static async traerPorIngresar(req, res) {
    const {numeroIdentificacion, password} = req.params
    const data = await AdminSede.traerPorIngresar(numeroIdentificacion, password)
    res.json(data)
  }

    static async traerPorNombre(req, res) {
      const {nombre} = req.params
      const data = await AdminSede.traerPorNombre(nombre)
      res.json(data)
    }

  static async eliminar (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await AdminSede.eliminar(numeroIdentificacion)
    res.json(data)
  }

  static async agregar (req, res) {
    const adminSede = req.body
    const data = await AdminSede.agregar(adminSede)
    res.json(data)
  }

  static async actualizar (req, res) {
    const {numeroIdentificacion} = req.params
    const adminSede = req.body
    const data = await AdminSede.actualizar(adminSede, numeroIdentificacion)
    res.json(data)
  }
}
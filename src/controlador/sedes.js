import { Sedes } from "../modelo/sedes.js"

export class ControladorSedes {
  static async traerTodos (req, res) {
    const data = await Sedes.traerTodos()
    res.json(data)
  }

  static async traerUno (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await Sedes.traerUno(numeroIdentificacion)
    res.json(data)
  } 

  static async traerPorDepartamento (req, res) {
    const {nombreDepartamento} = req.params
    const data = await Sedes.traerPorDepartamento(nombreDepartamento)
    res.json(data)
  } 

  static async eliminar (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await Sedes.eliminar(numeroIdentificacion)
    res.json(data)
  }

  static async agregar (req, res) {
    const sede = req.body
    const data = await Sedes.agregar(sede)
    res.json(data)
  }

  static async actualizar (req, res) {
    const {numeroIdentificacion} = req.params
    const sede = req.body
    const data = await Sedes.actualizar(sede, numeroIdentificacion)
    res.json(data)
  }
}
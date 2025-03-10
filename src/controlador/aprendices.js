import { Aprendices } from "../modelo/aprendices.js"

export class ControladorAprendices {
  static async traerTodos (req, res) {
    const data = await Aprendices.traerTodos()
    res.json(data)
  }

  static async traerUno (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await Aprendices.traerUno(numeroIdentificacion)
    res.json(data)
  }

  static async traerPorFormacion (req, res) {
    const {numeroIdentificacionFormacion} = req.params
    const data = await Aprendices.traerPorFormacion(numeroIdentificacionFormacion)
    res.json(data)
  }

  static async traerCompleto (req, res) {
    const {numeroIdentificacionFormacion} = req.params
    const data = await Aprendices.traerCompleto(numeroIdentificacionFormacion)
    res.json(data)
  }

  static async eliminar (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await Aprendices.eliminar(numeroIdentificacion)
    res.json(data)
  }

  static async agregar (req, res) {
    const aprendiz = req.body 
    const data = await Aprendices.agregar(aprendiz)
    res.json(data)
  }

  static async actualizar (req, res) {
    const {numeroIdentificacion} = req.params
    const aprendiz = req.body 
    const data = await Aprendices.actualizar(aprendiz, numeroIdentificacion)
    res.json(data)
  }
}
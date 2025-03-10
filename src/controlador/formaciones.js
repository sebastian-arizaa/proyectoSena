import { Formaciones } from "../modelo/formaciones.js"

export class ControladorFormaciones {
  static async traerTodos (req, res) {
    const data = await Formaciones.traerTodos()
    res.json(data)
  }

  static async traerUno (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await Formaciones.traerUno(numeroIdentificacion)
    res.json(data)
  }

  static async traerPorSede (req, res) {
    const {numeroIdentificacionSede} = req.params
    const data = await Formaciones.traerPorSede(numeroIdentificacionSede)
    res.json(data)
  }

  static async traerPorNombre (req, res) {
    const {nombre} = req.params
    const data = await Formaciones.traerPorNombre(nombre)
    res.json(data)
  }

  static async eliminar (req, res) {
    const {numeroIdentificacion} = req.params
    const data = await Formaciones.eliminar(numeroIdentificacion)
    res.json(data)
  }

  static async agregar (req, res) {
    const formacion = req.body
    const data = await Formaciones.agregar(formacion)
    res.json(data)
  }

  static async actualizar (req, res) {
    const {numeroIdentificacion} = req.params
    const formacion = req.body
    const data = await Formaciones.actualizar(formacion, numeroIdentificacion)
    res.json(data)
  }
}
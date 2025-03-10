import { AdminRoot } from "../modelo/adminroot.js"

export class ControladorAdminRoot {
  static async traerPorIngresar(req, res) {
    const {numeroIdentificacion, password} = req.params
    const data = await AdminRoot.traerPorIngresar(numeroIdentificacion, password)
    res.json(data)
  }
}
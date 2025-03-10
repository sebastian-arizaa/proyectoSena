import { connection } from "../servidor/conexion.js"

export class AdminRoot {
  static async traerPorIngresar(numeroIdentificacion, password) {
    const query = "SELECT * FROM adminroot WHERE numeroIdentificacion = ? AND password = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion, password], (err, response) => {
        if(err) console.log(err)
        resolve(response)
      })
    })
  }
}
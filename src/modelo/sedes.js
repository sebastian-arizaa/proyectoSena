import { connection } from "../servidor/conexion.js"

export class Sedes {
  static async traerTodos() {
    const query = "SELECT * FROM sedes"
    return new Promise((resolve, reject) => { 
      connection.query(query, (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async traerUno(numeroIdentificacion) {
    const query = "SELECT * FROM sedes WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log(err)
        resolve(response)
      })
    })
  }

  static async traerPorDepartamento(nombreDepartamento) {
    const query = "SELECT * FROM sedes WHERE nombreDepartamento = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [nombreDepartamento], (err, response) => {
        if(err) console.log(err)
        resolve(response)
      })
    })
  }

  static async eliminar(numeroIdentificacion) {
    const query = "DELETE FROM sedes WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async agregar(sede) {
    const {
      nombre,
      nombreDepartamento,
      nombreMunicipio
    } = sede
    const query = "INSERT INTO sedes(nombre, nombreDepartamento, nombreMunicipio) VALUE (?, ?, ?)"
    return new Promise((resolve, reject) => { 
      connection.query(query, [nombre, nombreDepartamento, nombreMunicipio], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async actualizar(sede, id) {
    const {
      nombre,
      nombreDepartamento,
      nombreMunicipio
    } = sede
    const query = "UPDATE sedes SET nombre = ?, nombreDepartamento = ?, nombreMunicipio = ? WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [nombre, nombreDepartamento, nombreMunicipio, id], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }
}
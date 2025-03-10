import { connection } from "../servidor/conexion.js"

export class Aprendices {
  static async traerTodos() {
    const query = "SELECT * FROM aprendices"
    return new Promise((resolve, reject) => { 
      connection.query(query, (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async traerUno(numeroIdentificacion) {
    const query = "SELECT * FROM aprendices WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log(err)
        resolve(response)
      })
    })
  }

  static async traerPorFormacion(numeroIdentificacionFormacion) {
    const query = "SELECT * FROM aprendices WHERE idFormacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacionFormacion], (err, response) => {
        if(err) console.log(err)
        resolve(response)
      })
    })
  }

  static async traerCompleto(numeroIdentificacionFormacion) {
    const query = "SELECT a.numeroIdentificacion, a.nombre, apellidos, celular, email, idFormacion, f.nombre as nombreFormacion, (SELECT nombre FROM sedes WHERE numeroIdentificacion = f.idSede ) AS nombreSede, (SELECT nombreDepartamento FROM sedes WHERE numeroIdentificacion = f.idSede) AS nombreDepartamento FROM aprendices a INNER JOIN formaciones f ON f.numeroIdentificacion = a.idFormacion WHERE a.numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacionFormacion], (err, response) => {
        if(err) console.log(err)
        resolve(response)
      })
    })
  }

  static async eliminar(numeroIdentificacion) {
    const query = "DELETE FROM aprendices WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async agregar(aprendiz) {
    const {
      numeroIdentificacion,
      nombre,
      apellidos,
      celular,
      email,
      idFormacion
    } = aprendiz
    const query = "INSERT INTO aprendices(numeroIdentificacion, nombre, apellidos, celular, email, idFormacion) VALUE (?, ?, ?, ?, ?, ?)"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion, nombre, apellidos, celular, email, idFormacion], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async actualizar(aprendiz, id) {
    const {
      numeroIdentificacion,
      nombre,
      apellidos,
      celular,
      email,
      idFormacion
    } = aprendiz
    const query = "UPDATE aprendices SET numeroIdentificacion = ?, nombre = ?, apellidos = ?, celular = ?, email = ?, idFormacion = ? WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion, nombre, apellidos, celular, email, idFormacion, id], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }
}
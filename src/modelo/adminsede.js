import { connection } from "../servidor/conexion.js"

export class AdminSede {
  static async traerTodos() {
    const query = "SELECT * FROM adminsede"
    return new Promise((resolve, reject) => { 
      connection.query(query, (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async traerUno(numeroIdentificacion) {
    const query = "SELECT * FROM adminsede WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log(err)
        resolve(response)
      })
    })
  }

  static async traerPorIngresar(numeroIdentificacion, password) {
    const query = "SELECT * FROM adminsede WHERE numeroIdentificacion = ? AND password = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion, password], (err, response) => {
        if(err) console.log(err)
        resolve(response)
      })
    })
  }

  static async traerPorNombre(nombre) {
    const query = "SELECT * FROM adminsede WHERE nombre LIKE ?"
    return new Promise((resolve, reject)=> {
      connection.query(query, [nombre], (err, response) => {
        if(err) console.log("Err: ", err)
        resolve(response)
      })
    })
  }

  static async traerCompleto(numeroIdentificacion) {
    const query = "SELECT a.numeroIdentificacion, a.nombre, a.apellidos, a.password, s.nombre AS nombreSede, s.nombreDepartamento from adminsede a INNER JOIN sedes s ON a.idSede_as = s.numeroIdentificacion WHERE a.numeroIdentificacion = ?"
    return new Promise((resolve, reject)=> {
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log("Err: ", err)
        resolve(response)
      })
    })
  }

  static async eliminar(numeroIdentificacion) {
    const query = "DELETE FROM adminsede WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async agregar(adminSede) {
    const {
      numeroIdentificacion,
      nombre,
      apellidos,
      password,
      idSede_as
    } = adminSede
    const query = "INSERT INTO adminsede(numeroIdentificacion, nombre, apellidos, password, idSede_as) VALUE (?, ?, ?, ?, ?)"
    return new Promise((resolve, reject) => { 
      connection.query(query, [numeroIdentificacion, nombre, apellidos, password, idSede_as], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async actualizar(adminSede, id) {
    const {
      numeroIdentificacion,
      nombre,
      apellidos,
      password,
      idSede_as
    } = adminSede
    const query = "UPDATE adminsede SET numeroIdentificacion = ?, nombre = ?, apellidos = ?, password = ?, idSede_as = ? WHERE numeroIdentificacion = ?"
    connection.query(query, [numeroIdentificacion, nombre, apellidos, password, idSede_as, id], (err, response) => {
      if(err) console.log("Error: ", err)
      return response
    })
  }
}

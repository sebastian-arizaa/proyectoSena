import { connection } from "../servidor/conexion.js"

export class AdminDepartamento {
  static async traerTodos() {
    const query = "SELECT * FROM admindepartamento"
    return new Promise((resolve, reject) => {
      connection.query(query, (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async traerUno(numeroIdentificacion) {
    const query = "SELECT * FROM admindepartamento WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject)=> {
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async traerPorIngresar(numeroIdentificacion, password) {
    const query = "SELECT * FROM admindepartamento WHERE numeroIdentificacion = ? AND password = ?"
    return new Promise((resolve, reject) => {
      connection.query(query, [numeroIdentificacion, password], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async traerPorNombre(nombre) {
    const query = "SELECT * FROM admindepartamento WHERE nombre LIKE ?"
    return new Promise((resolve, reject)=> {
      connection.query(query, [nombre], (err, response) => {
        if(err) console.log("Err: ", err)
        resolve(response)
      })
    })
  }

  static async eliminar(numeroIdentificacion) {
    const query = "DELETE FROM admindepartamento WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => {
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async agregar(adminDepartamento) {
    const {
      numeroIdentificacion,
      nombre,
      apellidos,
      password,
      nombreDepartamento
    } = adminDepartamento
    const query = "INSERT INTO admindepartamento(numeroIdentificacion, nombre, apellidos, password, nombreDepartamento) VALUE (?, ?, ?, ?, ?)"
    return new Promise((resolve, reject) => {
      connection.query(query, [numeroIdentificacion, nombre, apellidos, password, nombreDepartamento], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }

  static async actualizar(adminDepartamento, id) {
    const {
      numeroIdentificacion,
      nombre,
      apellidos,
      password,
      nombreDepartamento
    } = adminDepartamento
    const query = "UPDATE admindepartamento SET numeroIdentificacion = ?, nombre = ?, apellidos = ?, password = ?, nombreDepartamento = ? WHERE numeroIdentificacion = ?"
    return new Promise((resolve, reject) => { 
      connection.query(query,[numeroIdentificacion, nombre, apellidos, password, nombreDepartamento, id], (err, response) => {
        if(err) console.log("Error: ", err)
        resolve(response)
      })
    })
  }
}
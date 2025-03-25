import { connection } from "../servidor/conexion.js";

export class Formaciones {
  static async traerTodos() {
    const query = "SELECT * FROM formaciones";
    return new Promise((resolve, reject) => {
      connection.query(query, (err, response) => {
        if (err) console.log("Error: ", err);
        resolve(response);
      });
    });
  }

  static async traerUno(numeroIdentificacion) {
    const query = "SELECT * FROM formaciones WHERE numeroIdentificacion = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if (err) console.log(err);
        resolve(response);
      });
    });
  }

  static async traerPorMunicipio(nombreMunicipio) {
    const query = "SELECT * FROM formaciones WHERE nombreMunicipio = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [nombreMunicipio], (err, response) => {
        if (err) console.log(err);
        resolve(response);
      });
    });
  }

  static async traerPorNombre(nombre) {
    const query = `SELECT * FROM formaciones WHERE nombre like ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [nombre], (err, response) => {
        if (err) console.log(err);
        resolve(response);
      });
    });
  }

  // static async traerCompleto(numeroIdentificacionFormacion) {
  //   const query =
  //     "select f.numeroIdentificacion, f.nombre, f.tipo, f.instructores, f.horario, f.fechaInicio, f.fechaFin, f.nombreDepartamento, s.nombre As nombreSede, s.nombreDepartamento from formaciones f inner join sedes s on f.idSede = s.numeroIdentificacion WHERE f.numeroIdentificacion = ?";
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       query,
  //       [numeroIdentificacionFormacion],
  //       (err, response) => {
  //         if (err) console.log(err);
  //         resolve(response);
  //       }
  //     );
  //   });
  // }

  static async eliminar(numeroIdentificacion) {
    const query = "DELETE FROM formaciones WHERE numeroIdentificacion = ?";
    return new Promise((resolve, reject) => {
      connection.query(query, [numeroIdentificacion], (err, response) => {
        if (err) console.log("Error: ", err);
        resolve(response);
      });
    });
  }

  static async agregar(formacion) {
    const {
      nombre,
      tipo,
      instructores,
      horario,
      fechaInicio,
      fechaFin,
      nombreMunicipio,
      nombreDepartamento
    } = formacion;
    const query =
      "INSERT INTO formaciones(nombre, tipo, instructores, horario, fechaInicio, fechaFin, nombreMunicipio, nombreDepartamento) VALUE (?, ?, ?, ?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [nombre, tipo, instructores, horario, fechaInicio, fechaFin, nombreMunicipio, nombreDepartamento],
        (err, response) => {
          if (err) console.log("Error: ", err);
          resolve(response);
        }
      );
    });
  }

  static async actualizar(formacion, id) {
    const {
      nombre,
      tipo,
      instructores,
      horario,
      fechaInicio,
      fechaFin,
      nombreMunicipio,
      nombreDepartamento
    } = formacion;
    const query =
      "UPDATE formaciones SET nombre = ?, tipo = ?, instructores = ?, horario = ?, fechaInicio = ?, fechaFin = ?, nombreMunicipio = ?, nombreDepartamento = ? WHERE numeroIdentificacion = ?";
    return new Promise((resolve, reject) => {
      connection.query(query,[nombre, tipo, instructores, horario, fechaInicio, fechaFin, nombreMunicipio, nombreDepartamento, id], (err, response) => {
          if (err) console.log("Error: ", err);
          resolve(response);
        }
      );
    });
  }
}

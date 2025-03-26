import mysql2 from "mysql2"
import { DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js"

export let connection;

function handleDisconnect() {
  connection = mysql2.createConnection({
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  connection.connect(err => {
    if (err) {
      console.error('Error al reconectar:', err);
      setTimeout(handleDisconnect, 2000); // intenta de nuevo en 2 segundos
    } else {
      console.log('Conexión restablecida');
    }
  });

  connection.on('error', err => {
    console.log("🚀 ~ handleDisconnect ~ err:", err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.warn('Conexión perdida. Reconectando...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();
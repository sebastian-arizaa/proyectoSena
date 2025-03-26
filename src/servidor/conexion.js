import mysql2 from "mysql2"
import { DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js"

export const connection = mysql2.createConnection({
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD
})
connection.connect((err) => {
  if(err) {
    console.log({DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER })
    console.log("Error: ", err)
    return
  }  
  console.log({DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER })
  console.log("Connection done")
})
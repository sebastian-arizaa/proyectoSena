import mysql2 from "mysql2"

export const connection = mysql2.createConnection({
  database: "sena",
  host: "localhost",
  port: 3306,
  user: "adminsena",
  password: "123"
})
connection.connect((err) => {
  if(err) {
    console.log("Error: ", err)
    return
  }  
  console.log("Connection done")
})
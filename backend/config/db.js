import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
let db;
function connectToDB() {
  db = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1", 
    user: process.env.DB_USER || "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });



  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the MySQL database:", err.message);
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectToDB, 5000); 
    } else {
      console.log("Connected to the MySQL database.");
    }

  });
  
  return db
}

db = connectToDB();
export default db;
 
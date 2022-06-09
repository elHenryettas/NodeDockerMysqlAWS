import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.BD_HOST,
  port: Number(process.env.BD_PORT),
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  connectionLimit: Number(process.env.BD_CONNECTION_LIMIT),
});

export default pool;

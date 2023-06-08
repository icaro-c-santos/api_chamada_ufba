import mysql from "mysql2";
import { config } from "dotenv";
import * as dotenv from "dotenv";
dotenv.config();
config();


//@ts-ignore.
export const dbConnection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

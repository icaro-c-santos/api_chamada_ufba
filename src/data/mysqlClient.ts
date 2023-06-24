import mysql, { QueryError, RowDataPacket, FieldPacket } from "mysql2";

import { config } from "dotenv";
import * as dotenv from "dotenv";
import fs from 'fs';

dotenv.config();
config();


export const mysqlClient = {
    connection: function () {
        //@ts-ignore.
        return mysql.createConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
        });
    },
    executeSQLQueryParams(
        sql: string,
        params: any[]
    ): Promise<[mysql.QueryError | null, any, mysql.FieldPacket[]]> {
        return new Promise<[mysql.QueryError | null, any, mysql.FieldPacket[]]>((resolve, reject) => {
            const conn = this.connection();
            conn.query(sql, params, (error, results, fields) => {
                conn.end();

                if (error) {
                    reject(error);
                } else {
                    resolve([null, results, fields]);
                }
            });
        });
    },
    executeSQLQuery(
        sql: string
    ): Promise<[mysql.QueryError | null, mysql.RowDataPacket[], mysql.FieldPacket[]]> {
        return new Promise<[mysql.QueryError | null, mysql.RowDataPacket[], mysql.FieldPacket[]]>((resolve, reject) => {
            const conn = this.connection();
            conn.query(sql, (error, results, fields) => {
                conn.end();

                if (error) {
                    reject(error);
                } else {
                    resolve([null, results as mysql.RowDataPacket[], fields]);
                }
            });
        });
    }

}

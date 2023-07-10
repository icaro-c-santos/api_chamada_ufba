import mysql, { RowDataPacket } from "mysql2";
import { config } from "dotenv";
import * as dotenv from "dotenv";
import mysqldump from "mysqldump"
import path = require("path");
import { salvarArquivoSQL } from "./mysqlClientBackup";
dotenv.config();
config();

export default class MysqlClient {


    connection() {
        //@ts-ignore.
        return mysql.createConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
        });
    }

    executeSQLQueryParams(
        sql: string,
        params: any[]
    ): Promise<RowDataPacket[]> {
        return new Promise<RowDataPacket[]>((resolve, reject) => {
            const conn = this.connection();
            conn.query(sql, params, (error, results, fields) => {

                conn.end();
                if (error) {
                    reject(error);
                } else {
                    resolve(results as RowDataPacket[]);
                }
            });
        });
    }

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

    async backup() {

        const caminho = path.resolve(__dirname, 'dump.sql');
        const dump = await mysqldump({
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER || "",
                password: process.env.DB_PASSWORD || "",
                database: process.env.DB_NAME || "",
                port: 3306,
            },
            dumpToFile: caminho,
        });

        await salvarArquivoSQL(caminho);
    }

}

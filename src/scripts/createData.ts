import { FieldPacket, QueryError, RowDataPacket } from "mysql2";
import { mysqlClient } from "../data/mysqlClient";
import fs from 'fs';
import path from "path";
import { error } from "console";


const createData = async () => {
    const filePath = path.resolve(__dirname, 'sqlcreate.sql');
    let sqlContent = "";
    try {
        sqlContent = fs.readFileSync(filePath, 'utf8');
    } catch (error: any) {
        throw new Error(`Erro ao ler o arquivo ${filePath}: ${error.message}`)
    }

    const sqlStatements = sqlContent.split(';').filter(statement => statement.trim() !== '');

    for (let sql of sqlStatements) {
        try {
            await mysqlClient.executeSQLQuery(sql);
        } catch (error: any) {
            throw new Error("NÃO FOI POSSÍVEL INICIAR O BANCO -> " + error.message);
        }

    }
    console.log("BANCO INICIADO COM SUCESSO!");


}

createData();

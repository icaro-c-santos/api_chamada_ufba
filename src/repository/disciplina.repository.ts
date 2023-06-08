import { dbConnection } from "../data"
import { TCreateSubject, validSubject } from "../types/TSubject";

export const createSubject = async (subject: TCreateSubject) => {

    const sql = 'INSERT INTO disciplina (nome, carga_horaria) VALUES (?, ?)';
    validSubject(subject);

    return new Promise((resolve, reject) => {

        dbConnection.query(sql, [subject.name, subject.cargaHoraria], (error, results: any) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(results.insertId);
            }
        });
    }).finally(() => {
        dbConnection.end();
    })




}


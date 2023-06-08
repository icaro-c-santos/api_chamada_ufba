import { dbConnection } from "../data"
import { BusinessExceptions } from "../exceptions";
import { TCreateProfessor, validProfessor } from "../types/TProfessor";

export const createProfessor = async (professor: TCreateProfessor) => {

    const sql = 'INSERT INTO Professor (cpf, nome, email, telefone) VALUES (?, ?, ?, ?)';
    validProfessor(professor);

    return new Promise((resolve, reject) => {
        dbConnection.query(sql, [professor.cpf, professor.name, professor.email, professor.telefone], (error, results: any) => {
            if (error) {
                if (error?.code == `ER_DUP_ENTRY` && error.message.includes("for key 'PRIMARY'")) {
                    return reject(new BusinessExceptions("Numero de cpf já cadastrado!", "duplicateCpf", 400));
                }
                if (error?.code == `ER_DUP_ENTRY` && error.message.includes("for key 'email'")) {
                    return reject(new BusinessExceptions("Numero de email já cadastrado!", "duplicateEmail", 400));
                }

                return reject(error);
            } else {
                return resolve(results.insertId);
            }
        });
    }).finally(() => {
        dbConnection.end();
    })




}



import { dbConnection } from "../data"
import { BusinessExceptions } from "../exceptions";
import { TCreateStudent, validStudent } from "../types/TStudent";

export const createStudent = (student: TCreateStudent) => {

    const sql = 'INSERT INTO aluno (cpf, nome, matricula, email, telefone) VALUES (?, ?, ?, ?, ?)';
    validStudent(student);

    return new Promise((resolve, reject) => {
        dbConnection.query(sql, [student.cpf, student.name, student.matricula, student.email, student.telefone], (error, results: any) => {
            if (error) {
                if (error?.code == `ER_DUP_ENTRY` && error.message.includes("for key 'matricula")) {
                    return reject(new BusinessExceptions("Numero de matricula já cadastrado!", "duplicateMatricula", 400));
                }
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


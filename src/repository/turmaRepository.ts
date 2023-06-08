import { dbConnection } from "../data"
import { BusinessExceptions } from "../exceptions";
import { TCreateTurma, validTurma } from "../types/TTurma";

export const createTurma = async (turma: TCreateTurma) => {

    const sql = 'INSERT INTO turma (nome, fk_cod_disciplina) VALUES (?, ?)';
    validTurma(turma);

    return new Promise((resolve, reject) => {

        dbConnection.query(sql, [turma.name, turma.codigoDisciplina], (error, results: any) => {
            if (error) {
                if (error?.code == `ER_NO_REFERENCED_ROW_2` && error.message.includes("CONSTRAINT `turma_fk0` FOREIGN KEY (`fk_cod_disciplina`) REFERENCES `disciplina` (`codigo`)")) {
                    return reject(new BusinessExceptions("Codigo de disciplna invalido!", "duplicateMatricula", 404));
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


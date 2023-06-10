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


export const addStudentInTurma = async (studentId: string, turmaId: string) => {
    const sql = 'INSERT INTO turma_aluno (fk_turma_fk_aluno,fk_cod_turma,fk_cpf_aluno) VALUES (?, ?,?)';
    return new Promise((resolve, reject) => {

        const pk = studentId.concat(turmaId);

        dbConnection.query(sql, [pk, turmaId, studentId], (error, results: any) => {
            if (error) {

                if (error?.code == `ER_DUP_ENTRY` && error.message.includes("for key 'PRIMARY'")) {
                    return reject(new BusinessExceptions("Aluno já cadastrado nessa turma!", "duplicateMatricula", 404));
                }

                if (error?.code == `ER_NO_REFERENCED_ROW_2` && error.message.includes("FOREIGN KEY (`fk_cpf_aluno`) REFERENCES `aluno` (`cpf`))")) {
                    return reject(new BusinessExceptions("Aluno não encontrado!", "duplicateMatricula", 404));
                }


                if (error?.code == `ER_NO_REFERENCED_ROW_2` && error.message.includes("FOREIGN KEY (`fk_cod_turma`) REFERENCES `turma` (`codigo`))")) {
                    return reject(new BusinessExceptions("Turma não encontrada!", "duplicateMatricula", 404));
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


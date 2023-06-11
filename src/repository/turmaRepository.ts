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
    })



}


export const addStudentInTurma = async (studentId: string, turmaId: string) => {
    const sql = 'INSERT INTO turma_aluno (fk_turma_fk_aluno,fk_cod_turma,fk_cpf_aluno) VALUES (?, ?,?)';
    return new Promise((resolve, reject) => {

        const pk = `${studentId}${turmaId}`;

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
    })
}


export const addHorarioRommInTurma = async (idSection: string, idHorario: string, idRoom: string) => {
    const sql = 'INSERT INTO turm_horario_sala (fk_turma_fk_horario_fk_sala, fk_cod_turma, fk_cod_horario, fk_cod_sala)  VALUES (?,?,?,?)';
    return new Promise((resolve, reject) => {

        const pk = `${idSection}${idHorario}${idRoom}`;

        dbConnection.query(sql, [pk, idSection, idHorario, idRoom], (error, results: any) => {
            if (error) {

                if (error?.code == `ER_DUP_ENTRY` && error.message.includes("for key 'PRIMARY'")) {
                    return reject(new BusinessExceptions("Aula já cadastrada para essa turma!", "duplicateMatricula", 404));
                }


                return reject(error);
            } else {
                return resolve(pk);
            }
        });
    })
}

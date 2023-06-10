
import { buildStudent } from "../mock/builderStudent";
import { createSubject } from "../repository/disciplina.repository";
import { createStudent } from "../repository/student.repository";
import { addStudentInTurma, createTurma } from "../repository/turmaRepository";


const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const runBuildData = async () => {


    const disciplina01 = await createSubject({ name: "BANCO DE DADOS", cargaHoraria: 60 });
    const disciplina02 = await createSubject({ name: "LABORATORIO DE BANCO DE DADOS", cargaHoraria: 40 });
    const disciplina03 = await createSubject({ name: "MATEMTICA", cargaHoraria: 80 });
    const disciplina04 = await createSubject({ name: "INTRODUÇÃO A ADMINISTRAÇÃO", cargaHoraria: 60 });

    const turma01 = await createTurma({ name: "T01", codigoDisciplina: disciplina01 as number })
    const turma02 = await createTurma({ name: "T02", codigoDisciplina: disciplina02 as number })
    const turma03 = await createTurma({ name: "T03", codigoDisciplina: disciplina03 as number })
    const turma04 = await createTurma({ name: "T04", codigoDisciplina: disciplina04 as number })

    const idsStudents: string[] = [];
    for (let i = 0; i < 2000; i++) {
        try {
            let student = buildStudent();
            const idStudnet = await createStudent({
                name: student.name,
                cpf: student.cpf,
                email: student.email,
                matricula: student.matricula,
                telefone: student.telefone
            })
            idsStudents.push(student.cpf);
        } catch (error: any) {
            console.log(error.message);
        }
    }




    const newIds = shuffleArray(idsStudents);

    for (let i = 0; i < 1000; i++) {
        try {
            await addStudentInTurma(newIds[i], turma01 as string);
            await addStudentInTurma(newIds[i], turma02 as string);
            await addStudentInTurma(newIds[i], turma03 as string);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    for (let i = 1000; i < 2000; i++) {
        try {
            await addStudentInTurma(newIds[i], turma04 as string);
            await addStudentInTurma(newIds[i], turma03 as string);
        } catch (error: any) {
            console.log(error.message);
        }
    }



}


runBuildData().then();





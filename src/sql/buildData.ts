
import { buildStudent } from "../mock/builderStudent";
import { buildSubjects } from "../mock/builderSubjects";
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


const TOTALSTUDENTS = 100000;
const TOTALTURMAS = 5000;

export const runBuildData = async () => {

    const idsStudents: string[] = [];
    const idSubjects: string[] = [];
    const idSections: string[] = [];

    for (let subject of buildSubjects) {
        try {
            let idSubject = await createSubject({ name: subject.name, cargaHoraria: subject.cargaHoraria })
            if (idSubject != null && idSubject != 0) {
                idSubjects.push(idSubject as string);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    for (let i = 0; i < TOTALTURMAS; i++) {
        try {

            const randomIndex = Math.floor(Math.random() * idSubjects.length);
            const subjectId = idSubjects[randomIndex];

            let idTurma = await createTurma({
                name: `T${i + 1}`,
                codigoDisciplina: parseInt(subjectId)
            })

            if (idTurma != null && idTurma != 0) {
                idSections.push(idTurma as string);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }


    for (let i = 0; i < TOTALSTUDENTS; i++) {
        try {

            let student = buildStudent();

            const idStudnet = await createStudent({
                name: student.name,
                cpf: student.cpf,
                email: student.email,
                matricula: student.matricula,
                telefone: student.telefone
            })
            if (idStudnet != null) {
                idsStudents.push(student.cpf);
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }


    const newIds = shuffleArray(idsStudents); /// EMBARALHA O ARRAY DE STUDANTES

    for (let i = 0; i < TOTALSTUDENTS; i++) {
        try {
            const randomIndex = Math.floor(Math.random() * idSections.length);
            const sectionId = idSections[randomIndex];

            await addStudentInTurma(newIds[i], sectionId as string);
            await addStudentInTurma(newIds[i], sectionId as string);
            await addStudentInTurma(newIds[i], sectionId as string);
            await addStudentInTurma(newIds[i], sectionId as string);
            await addStudentInTurma(newIds[i], sectionId as string);
        } catch (error: any) {
            console.log(error.message);
        }
    }



}


runBuildData().then();





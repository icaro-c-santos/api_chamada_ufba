
import { buildRoom } from "../mock/builderRoom";
import { buildStudent } from "../mock/builderStudent";
import { buildSubjects } from "../mock/builderSubjects";
import { createSubject } from "../repository/disciplina.repository";
import { createRoom } from "../repository/room.repository";
import { createStudent } from "../repository/student.repository";
import { addHorarioRommInTurma, addStudentInTurma, createTurma } from "../repository/turmaRepository";
import { TClass } from "../types/TClass";


const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const TOTALSTUDENTS = 20000;
const TOTALTURMAS = 1000;
const TOTALSALAS = 100;
const TOTALPAF = 10;
const TOTALMATRICULAS = 5;
const TOTALHORARIOSTURMA = 8;

export const runBuildData = async () => {

    const idsStudents: string[] = [];
    const idSubjects: string[] = [];
    const idSections: string[] = [];
    const idRomms: string[] = [];
    const listAulas: TClass[] = [];
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


    for (let j = 1; j <= TOTALPAF; j++) {
        for (let i = 1; i <= TOTALSALAS; i++) {
            try {
                let idRomm = await createRoom({
                    numero: i,
                    paf: "PAF-" + j.toString(),
                })

                if (idRomm != null) {
                    idRomms.push(idRomm as string);
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
    }
    for (let i = 0; i < TOTALTURMAS; i++) {
        try {

            let randomIndex = Math.floor(Math.random() * idSubjects.length);
            let subjectId = idSubjects[randomIndex];

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

            let idStudnet = await createStudent({
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

    for (let sectionId of idSections) {
        for (let j = 0; j < TOTALHORARIOSTURMA; j++) {
            try {

                let randomIndex = Math.floor(Math.random() * idRomms.length);
                let idRomm = idRomms[randomIndex];
                let idHorario = Math.floor(Math.random() * 72);
                await addHorarioRommInTurma(sectionId, idHorario.toString(), idRomm);

            } catch (error: any) {
                console.log(error.message);
            }
        }
    }


    const newIds = shuffleArray(idsStudents); /// EMBARALHA O ARRAY DE STUDANTES

    for (let i = 0; i < TOTALSTUDENTS; i++) {
        for (let j = 0; j < TOTALMATRICULAS; j++) {
            try {
                let randomIndex = Math.floor(Math.random() * idSections.length);
                let sectionId = idSections[randomIndex];
                await addStudentInTurma(newIds[i], sectionId as string);
            } catch (error: any) {
                console.log(error.message);
            }

        }

    }





}


runBuildData().then();





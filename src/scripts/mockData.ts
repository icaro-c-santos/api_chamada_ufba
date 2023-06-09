import { faker, ru, th } from "@faker-js/faker"
import MysqlClient from "../data/mysqlClient"
import ProfessorRepository from "../modules/professor/professor.repository"
import StudentRepository from "../modules/student/student.repository"
import RoomRepository from "../modules/room/room.repository"
import SubjectRepository from "../modules/subject/subject.repository"
import SectionRepository from "../modules/section/section.repository"
import Subject from "../modules/subject/models/subject.entity"
import { Professor } from "../modules/professor/models/professor.entity"
import { hoursMock, subjectsMock } from "./mocks"
import Schedule from "../modules/schedule/models/schedule.entity"
import { ScheduleDto } from "../modules/schedule/models/schedule.dto"
import { ResultSetHeader } from "mysql2"
import Room from "../modules/room/models/room.entity"
import { CreateScheduleDto } from "../modules/schedule/models/createSchedule.dto"
import ScheduleRepository from "../modules/schedule/schedule.repository"
import { Student } from "../modules/student/models/student.entity"
import PresenceRepository from "../modules/presence/presence.repository"


const logSucess = (msg: string) => {

    console.log('\x1b[32m%s\x1b[0m', msg);

}

const logError = (msg: string) => {
    console.log('\x1b[31m%s\x1b[0m', msg);


}


const getNextDates = (startDate: Date, day: number, count: number): Date[] => {
    const dates: Date[] = [];
    let currentDate = new Date(startDate.getTime());

    while (dates.length < count) {
        const currentDay = currentDate.getDay();

        if (currentDay === day) {
            dates.push(new Date(currentDate.getTime()));
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};




export default class MockBuildData {

    protected studentRepository: StudentRepository
    protected professorRepository: ProfessorRepository
    protected roomRepository: RoomRepository
    protected subjectRepository: SubjectRepository
    protected sectionRepository: SectionRepository
    protected scheduleRepository: ScheduleRepository
    protected presenceRepository: PresenceRepository
    protected mysqlClient: MysqlClient
    constructor() {

        this.studentRepository = new StudentRepository();
        this.professorRepository = new ProfessorRepository();
        this.roomRepository = new RoomRepository();
        this.subjectRepository = new SubjectRepository();
        this.sectionRepository = new SectionRepository();
        this.scheduleRepository = new ScheduleRepository();
        this.presenceRepository = new PresenceRepository();
        this.mysqlClient = new MysqlClient();
    }



    async buildStudent(numberOfStudents: number) {

        for (let i = 0; i < numberOfStudents; i++) {
            try {
                await this.studentRepository.createStudent({
                    cpf: faker.number.bigInt({ min: 11111111111, max: 99999999999 }).toString(),
                    email: faker.internet.email(),
                    name: faker.person.fullName(),
                    phone: faker.number.int({ min: 111111111, max: 999999999 })
                })
                logSucess("ESTUDANTE CRIADO COM SUCESSO!");
            } catch (error: any) {
                logError(error.message);
            }
        }

    }

    async buildProfessors(numberOfProfessors: number) {

        for (let i = 0; i < numberOfProfessors; i++) {
            try {
                await this.professorRepository.createProfessor({
                    cpf: faker.number.bigInt({ min: 11111111111, max: 99999999999 }).toString(),
                    email: faker.internet.email(),
                    name: faker.person.fullName(),
                    phone: faker.number.int({ min: 111111111, max: 999999999 })
                })
                logSucess("PROFESSOR CRIADO COM SUCESSO!");
            } catch (error: any) {
                logError(error.message);
            }
        }

    }

    async buildRooms(numberOfRooms: number) {
        for (let i = 0; i < numberOfRooms; i++) {
            try {
                await this.roomRepository.createRoom({
                    paf: "PAF:".concat(faker.number.int({ min: 1, max: 12 }).toString()),
                    number: faker.number.int({ min: 10, max: 500 })
                })
                logSucess("SALA DE AULA CRIADA COM SUCESSO!");
            } catch (error: any) {
                logError(error.message);
            }
        }
    }

    async buildSubjects() {

        const { names, subjects_loads } = subjectsMock;
        for (let name of names) {
            try {
                await this.subjectRepository.createSubject({
                    name: name,
                    subject_load: subjects_loads[Math.floor(Math.random() * subjects_loads.length)]
                })
                logSucess("DISCIPLINA CRIADA COM SUCESSO!");
            } catch (error: any) {
                logError(error.message);
            }
        }
    }

    async buildSections(numberOfSections: number) {

        const subjects = await this.subjectRepository.getAllSubjects({
            page: 1, pageSize: 10000
        }) as Subject[];

        const data = await this.professorRepository.getAllProfessor({
            page: 1,
            pageSize: 50000
        }) as Professor[];

        const dataRom = await this.roomRepository.getAllRooms({
            page: 1,
            pageSize: 10000
        })





        const rooms: Room[] = [];
        const profesors: Professor[] = [];
        const schedule: Omit<Schedule, "code" | "sectionCode" | "roomCode">[] = [];;


        let j = 0;
        for (let i = 0; i < numberOfSections; i++) {
            try {
                if (j >= subjects.length) {
                    j = 0;
                }

                if (profesors.length == 0) {
                    data.forEach(item => profesors.push(item));
                }
                if (schedule.length == 0) {
                    hoursMock.forEach(item => schedule.push(item));
                }

                if (rooms.length == 0) {
                    dataRom.forEach(item => rooms.push(item));
                }
                const teacherOne = profesors.splice(Math.floor(Math.random() * profesors.length), 1)[0];
                const teacherTwo = profesors.splice(Math.floor(Math.random() * profesors.length), 1)[0];

                const { code } = await this.sectionRepository.createSection({
                    subject: subjects[j].code
                });

                const schedules: Omit<Schedule, "code" | "sectionCode" | "roomCode">[] = [];


                schedules.push(schedule.splice(Math.floor(Math.random() * schedule.length), 1)[0]);

                schedules.push(schedule.splice(Math.floor(Math.random() * schedule.length), 1)[0]);

                schedules.push(schedule.splice(Math.floor(Math.random() * schedule.length), 1)[0]);

                if (Math.random() < 0.3) {

                    schedules.push(schedule.splice(Math.floor(Math.random() * schedule.length), 1)[0]);

                }

                await this.sectionRepository.addProfessorInSection(code, teacherOne.code);

                if (Math.random() < 0.2) {
                    await this.sectionRepository.addProfessorInSection(code, teacherTwo.code);
                }


                for (let schedule of schedules) {
                    try {
                        const r = rooms.splice(Math.floor(Math.random() * rooms.length), 1)[0];
                        await this.scheduleRepository.createSchedule({
                            ...schedule, roomCode: r.code,
                            sectionCode: code
                        })
                    } catch (error: any) {
                        logError(error.message);
                    }
                }



                j++;
                logSucess("TURMA CRIADA COM SUCESSO!");
            } catch (error: any) {
                logError(error.message);
            }
        }

    }


    async buildCall() {

        let schedules: Schedule[] = [];
        let pageSize = 2;
        let pageIndex = 1;
        do {
            schedules = await this.scheduleRepository.getAllSchedules({
                page: pageIndex, pageSize: pageSize
            }) as unknown as Schedule[];
            pageIndex++;
            let presenceCreated = 0;
            for (const schedule of schedules) {
                const { day, code, sectionCode } = schedule;
                const students = await this.sectionRepository.getStudentsInSection(sectionCode);
                if (schedule.day >= 6) {
                    continue;
                }
                for (const student of students) {

                    const datas = getNextDates(new Date("03-01-2023"), day + 1, 15);

                    for (let data of datas) {
                        try {

                            await this.presenceRepository.createPresence({
                                date: data,
                                scheduleCode: code,
                                studentEnrolment: student.enrolment,
                                status: generateRandomStatus()
                            })
                            presenceCreated++;
                            logSucess("CRIANDO PRESENÇA" + presenceCreated);
                        } catch (error: any) {
                             logError("ERRO AO CRIAR PRESENÇA ->" + error?.message);
                        }
                    }

                }

            }



        } while (schedules.length > 0)





    }


    async buildStudentInSection() {

        const data = await this.sectionRepository.getAllSections({ page: 1, pageSize: 10000 });
        const students = await this.studentRepository.getAllStudent({ page: 1, pageSize: 50000 });

        let studentsSort: Student[] = [];



        for (let section of data) {

            if (studentsSort.length == 0) {
                students.forEach(item => studentsSort.push(item));
            }

            let enrolmentToAdd = studentsSort.pop()?.enrolment;
            if (enrolmentToAdd) {
                try {
                    await this.sectionRepository.addStudentInSection(section.code, enrolmentToAdd);
                    logSucess("ADICIONANDO ESTUDANTE!");
                } catch (error) {

                }

            }
            enrolmentToAdd = studentsSort.pop()?.enrolment;
            if (enrolmentToAdd) {
                try {
                    await this.sectionRepository.addStudentInSection(section.code, enrolmentToAdd);
                    logSucess("ADICIONANDO ESTUDANTE!");
                } catch (error) {

                }

            }

            enrolmentToAdd = studentsSort.pop()?.enrolment;
            if (enrolmentToAdd) {
                try {
                    await this.sectionRepository.addStudentInSection(section.code, enrolmentToAdd);
                    logSucess("ADICIONANDO ESTUDANTE!");
                } catch (error) {

                }

            }

            enrolmentToAdd = studentsSort.pop()?.enrolment;
            if (enrolmentToAdd) {
                try {
                    await this.sectionRepository.addStudentInSection(section.code, enrolmentToAdd);
                    logSucess("ADICIONANDO ESTUDANTE!");
                } catch (error) {

                }

            }


            enrolmentToAdd = studentsSort.pop()?.enrolment;
            if (enrolmentToAdd) {
                try {
                    await this.sectionRepository.addStudentInSection(section.code, enrolmentToAdd);
                    logSucess("ADICIONANDO ESTUDANTE!");
                } catch (error) {

                }

            }

        }
    }


}

const generateRandomStatus = (): number => {
    const random = Math.random();

    if (random <= 0.3) {
        return 2;
    } else if (random <= 0.4) {
        return 3;
    } else {
        return 1;
    }
};





const run = async () => {

    const mockBuildData = new MockBuildData();
    await mockBuildData.buildProfessors(100);
     await mockBuildData.buildStudent(2000);
     await mockBuildData.buildSubjects();
     await mockBuildData.buildRooms(200);
     await mockBuildData.buildSections(250);
     await mockBuildData.buildStudentInSection(); 
    await mockBuildData.buildCall();


}


run().then();


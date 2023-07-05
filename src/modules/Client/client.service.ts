import MysqlClient from "../../data/mysqlClient";
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";
import { Pagination } from "../../types/Pagination";
import CreatePresenceDto from "../presence/models/createPresence.dto";
import PresenceRepository from "../presence/presence.repository";
import { Person, Professor } from "../professor/models/professor.entity";
import ProfessorRepository from "../professor/professor.repository";
import Room from "../room/models/room.entity";
import RoomRepository from "../room/room.repository";
import ScheduleRepository from "../schedule/schedule.repository";
import { CreateSectionDto } from "../section/models/createSection.dto";
import Section from "../section/models/section.entity";
import SectionRepository from "../section/section.repository";
import { Student } from "../student/models/student.entity";
import StudentRepository from "../student/student.repository";
import { Filters } from "./client.controller";


export type SectionTeacher = {
    professorCode: number,
    sectionCode: number
}


export type User = {
    login: string,
    senha: string,
    token: string,
    enrolment: number,
    name: string,
    codeProfessor: number
}

export default class ClientService {
    private sectionRepository: SectionRepository
    private presenceRepository: PresenceRepository
    private scheduleRepository: ScheduleRepository
    private roomRepository: RoomRepository
    protected mysqlClient: MysqlClient;
    private studentRepository: StudentRepository
    private professorRepository: ProfessorRepository

    constructor() {
        this.sectionRepository = new SectionRepository();
        this.presenceRepository = new PresenceRepository();
        this.scheduleRepository = new ScheduleRepository();
        this.roomRepository = new RoomRepository();
        this.mysqlClient = new MysqlClient();
        this.professorRepository = new ProfessorRepository();
        this.studentRepository = new StudentRepository();
    }


    async getAllSectionsTeacher({ page = 1, pageSize = 1000, teacherCode }: Pagination & { teacherCode: number }): Promise<SectionTeacher[]> {

        const sections = await this.sectionRepository.getSectionsOfTeacher({ page, pageSize, teacherCode }) as unknown as SectionTeacher[];
        return sections;
    }

    async getAllSectionsStudent({ page = 1, pageSize = 1000, enrolment }: Pagination & { enrolment: number }): Promise<SectionTeacher[]> {

        const sections = await this.sectionRepository.getSectionsOfStudent({ page, pageSize, enrolment }) as unknown as SectionTeacher[];
        return sections;
    }

    async getAllPresencesOfStudent({ enrolment, sectionCode }: { enrolment: number, sectionCode: number }) {

        return await this.presenceRepository.getPresenceByFilter({
            studentEnrolment: enrolment,
            sectionCode: sectionCode
        })

    }

    async getAllPresencesOfSection(filters: Filters) {

        return await this.presenceRepository.getPresenceByFilter(filters)

    }

    async createPresence(createPresenceDto: CreatePresenceDto) {
        return await this.presenceRepository.createPresence(createPresenceDto)
    }


    async getDataSectionOfStudent(sectionCode: number, enrolment: number) {

        const section = await this.sectionRepository.getSectionByCode(sectionCode);
        if (!section) {
            throw new BusinessExceptions("TURMA NÃO EXISTE!", "notFoundResource", 404);
        }
        const professors = await this.sectionRepository.getProfessorsInSection(sectionCode);
        const schedules = await this.scheduleRepository.getScheduleByFilters({
            page: 1, pageSize: 10, sectionCode: sectionCode
        })

        const scheduleDto: any[] = [];

        for (let schedule of schedules) {
            const room = await this.roomRepository.getRoomsByCode(schedule.roomCode);
            scheduleDto.push({ ...schedule, room: room })
        }

        const presences = await this.presenceRepository.getPresenceByFilter({
            studentEnrolment: enrolment,
            sectionCode: sectionCode,
            page: 1,
            pageSize: 2000 ///ISSO É UM ERRO NUNCA FAÇA ISSO O CERTO É UM FOR PQ SE FOR MAIOR QUE 2000 ELE NÃO PERCORR E PERDE O NUMERO 2001 EM DIANTE
        })

        return {

            section, presences, professors, schedules: scheduleDto
        };
    }


    async getUser(login: string, password: string) {


        if (login == null || password == null) {
            return null;
        }
        const sql = `select * from user where login = ? AND senha = ?`;


        const result = await this.mysqlClient.executeSQLQueryParams(sql, [login, password]) as unknown as User[];
      
        if (result == null || result.length == 0) {
            return null;
        }

        const user = result[0];

        if (user.enrolment) {

            const person = await this.studentRepository.getStudentByEnrolment(user.enrolment.toString()) as unknown as Person
            console.log(person);
            return {
                ...user,
                //@ts-ignore
                name: person.name,
                enrolment: user.enrolment

            }
        }

        if (user.codeProfessor) {
            const person = await this.professorRepository.getProfessorByCode(user.codeProfessor.toString()) as unknown as Person;
            console.log(person);
            return {
                ...user,
                codeProfessor: user.codeProfessor,
                name: person.name
            }
        }


        return null;

    }



}
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";
import { Pagination } from "../../types/Pagination";
import PresenceRepository from "../presence/presence.repository";
import { Professor } from "../professor/models/professor.entity";
import ProfessorRepository from "../professor/professor.repository";
import ScheduleRepository from "../schedule/schedule.repository";
import { Student } from "../student/models/student.entity";
import { CreateSectionDto } from "./models/createSection.dto";
import Section from "./models/section.entity";
import SectionRepository from "./section.repository";

export default class SectionService {
    private sectionRepository: SectionRepository
    private professorRepository: ProfessorRepository
    private presenceRepository: PresenceRepository
    private scheduleRepository: ScheduleRepository
    constructor() {
        this.sectionRepository = new SectionRepository();
        this.professorRepository = new ProfessorRepository();
        this.presenceRepository = new PresenceRepository();
        this.scheduleRepository = new ScheduleRepository();
    }


    async getDataSection(sectionCode: number) {

        const students = await this.sectionRepository.getStudentsInSection(sectionCode);
        const section = await this.sectionRepository.getSectionByCode(sectionCode);
        if(!section){
            throw new BusinessExceptions("TURMA NÃO EXISTE!","notFoundResource",404);
        }
        const professors = await this.sectionRepository.getProfessorsInSection(sectionCode);
        const schedules = await this.scheduleRepository.getScheduleByFilters({
            page: 1, pageSize: 10, sectionCode: sectionCode
        })

        const loadSubject = section.subject_load;
        const studentsDto: unknown[] = [];

        for (let student of students) {
            let statusStudent = "";
            const absences = await this.presenceRepository.getPresenceByFilter({
                sectionCode: sectionCode,
                studentEnrolment: student.enrolment,
                status: 2,
                page: 1,
                pageSize: 2000 ///ISSO É UM ERRO NUNCA FAÇA ISSO O CERTO É UM FOR PQ SE FOR MAIOR QUE 2000 ELE NÃO PERCORR E PERDE O NUMERO 2001 EM DIANTE
            })

            const totalAbsences = absences.reduce((accumulator, presence) => accumulator + presence.load_presence, 0) / 60;

            if (totalAbsences >= (loadSubject * 0.25)) {
                statusStudent = "disapproved";
            } else if (totalAbsences >= (loadSubject * 0.20)) {
                statusStudent = "alert";
            } else {
                statusStudent = "safe"
            }
            console.log(schedules);

            studentsDto.push({
                ...student, status: statusStudent, absences: absences.length,
            })


        }


        return {

            section: section.code,
            subjectName: section.name,
            subjectLoad: section.subject_load,
            professors: professors,
            students: studentsDto,
            schedules: schedules
        };
    }
    async createSection(create: CreateSectionDto): Promise<Section> {
        const section = await this.sectionRepository.createSection(create);
        return section;
    }

    async getAllSections({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Section[]> {
        const sections = await this.sectionRepository.getAllSections();
        return sections;
    }

    async getProfessorsInSection(code: number): Promise<Professor[]> {
        const teacher = await this.sectionRepository.getProfessorsInSection(code);
        return teacher;
    }


    async getStudentsInSection(code: number): Promise<unknown> {
        const students = await this.sectionRepository.getStudentsInSection(code);
        const section = await this.sectionRepository.getSectionByCode(code);
        const loadSubject = section.subject_load;
        const studentsDto: unknown[] = [];

        for (let student of students) {
            let statusStudent = "";
            const absences = await this.presenceRepository.getPresenceByFilter({
                sectionCode: code,
                studentEnrolment: student.enrolment,
                status: 2,
                page: 1,
                pageSize: 2000 ///ISSO É UM ERRO NUNCA FAÇA ISSO O CERTO É UM FOR PQ SE FOR MAIOR QUE 2000 ELE NÃO PERCORR E PERDE O NUMERO 2001 EM DIANTE
            })

            const totalAbsences = absences.reduce((accumulator, presence) => accumulator + presence.load_presence, 0) / 60;

            if (totalAbsences >= (loadSubject * 0.25)) {
                statusStudent = "disapproved";
            } else if (totalAbsences >= (loadSubject * 0.20)) {
                statusStudent = "alert";
            } else {
                statusStudent = "safe"
            }

            studentsDto.push({
                ...student, status: statusStudent, absences: totalAbsences
            })


        }


        return {

            section: section.code,
            subjectName: section.name,
            subjectLoad: section.subject_load,
            students: studentsDto
        };
    }

    async addProfessorInSection(sectionCode: number, professorCode: number): Promise<boolean> {
        const teacher = await this.sectionRepository.addProfessorInSection(sectionCode, professorCode);
        return teacher;

    }

    async removeProfessorInSection(sectionCode: number, professorCode: number): Promise<boolean> {
        const deletedTeacher = await this.sectionRepository.removeProfessorInSection(sectionCode, professorCode);
        return deletedTeacher;
    }

    async addStudentInSection(sectionCode: number, studentEnrolment: number): Promise<boolean> {
        const student = await this.sectionRepository.addStudentInSection(sectionCode, studentEnrolment);
        return student;
    }

    async deleteSection(sectionCode: number): Promise<boolean> {
        const student = await this.sectionRepository.deleteSection(sectionCode);
        return student;
    }

    async removeStudentInSection(sectionCode: number, studentEnrolment: number): Promise<boolean> {
        const deletedStudent = await this.sectionRepository.removeStudentInSection(sectionCode, studentEnrolment);
        return deletedStudent;
    }
}
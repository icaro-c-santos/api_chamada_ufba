import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import { Pagination } from "../../types/Pagination";
import { CreateSectionDto } from "./models/createSection.dto";
import Section from "./models/section.entity";
import { Professor } from "../professor/models/professor.entity";
import { Student } from "../student/models/student.entity";

export interface SectionIncludes {
    professors?: boolean,
    students?: boolean,
    subject?: boolean
    schedules?: boolean
}
export default class SectionRepository {

    protected mysqlClient: MysqlClient;
    constructor() {
        this.mysqlClient = new MysqlClient();
    }

    async createSection(createSectionDto: CreateSectionDto): Promise<Section> {
        const { subject } = createSectionDto;
        const sql = `INSERT INTO sections (subject) values (?);`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [subject]) as unknown as ResultSetHeader;
        return {
            code: results.insertId,
            subject: subject
        };



    }

    async getAllSections({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Section[]> {
        const offset = (page - 1) * pageSize;
        const sql = `select * from sections LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [pageSize, offset]) as unknown as Section[];
        return results;
    }

    async getProfessorsInSection(sectionCode: number): Promise<Professor[]> {

        const sql = `SELECT * FROM sections inner join professors_sections on sections.code = professors_sections.sectionCode inner join professors on professors.code = professors_sections.professorCode inner join persons on professors.cpf = persons.cpf where sections.code = ?`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [sectionCode]) as unknown as Professor[];
        return results;
    }

    async getStudentsInSection(sectionCode: number): Promise<Student[]> {

        const sql = `SELECT * FROM sections inner join students_sections on sections.code = students_sections.sectionCode inner join students on  students_sections.studentEnrolment = students.enrolment inner join person on person.cpf = students.cpf`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [sectionCode]) as unknown as Student[];
        return results;
    }

    async addStudentInSection(sectionCode: number, studentEnrolment: number): Promise<boolean> {
        try {

        } catch (error) {

        }

        return false;
    }

    async removeStudentInSection(sectionCode: number, studentEnrolment: number): Promise<boolean> {
        try {

        } catch (error) {

        }

        return false;
    }

    async addProfessorInSection(sectionCode: number, professorCode: number): Promise<boolean> {

        try {

        } catch (error) {

        }

        return false;
    }

    async removeProfessorInSection(sectionCode: number, professorCode: number): Promise<boolean> {

        try {

        } catch (error) {

        }

        return false;
    }

    async addScheduleInSection(sectionCode: number, scheduleCode: number): Promise<boolean> {

        try {

        } catch (error) {

        }

        return false;
    }
    
    async deleteScheduleInSection(sectionCode: number, scheduleCode: number): Promise<boolean> {

        try {

        } catch (error) {

        }

        return false;
    }


} 
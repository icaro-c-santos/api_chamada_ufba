import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import { Pagination } from "../../types/Pagination";
import { CreateSectionDto } from "./models/createSection.dto";
import Section from "./models/section.entity";
import { Professor } from "../professor/models/professor.entity";
import { Student } from "../student/models/student.entity";
import { CreateScheduleDto } from "../schedule/models/createSchedule.dto";
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";

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

        const sql = `SELECT persons.*,enrolment from students_sections inner join students on students_sections.studentEnrolment = students.enrolment inner join persons
        on persons.cpf = students.cpf where sectionCode = ?;`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [sectionCode])
        return results as Student[];
    }

    async addProfessorInSection(sectionCode: number, professorCode: number): Promise<boolean> {

        try {
            const sql = `INSERT INTO professors_sections (professorCode,sectionCode) values (?,?);`;
            const results = await this.mysqlClient.executeSQLQueryParams(sql, [professorCode, sectionCode]) as unknown as ResultSetHeader;
            return results.affectedRows >= 1;
        } catch (error: any) {
            if (error?.code && error.code == "ER_DUP_ENTRY") {
                new BusinessExceptions("professor já existe nessa turma", "duplicateEntity", 400);
            }
            throw error
        }

    }

    async removeProfessorInSection(sectionCode: number, professorCode: number): Promise<boolean> {
        const sql = `delete from professors_sections where professorCode = ? AND sectionCode = ?;`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [professorCode, sectionCode]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }

    async addStudentInSection(sectionCode: number, studentEnrolment: number): Promise<boolean> {

        try {
        
            const sql = `INSERT INTO students_sections (studentEnrolment,sectionCode) values (?,?);`;
            const results = await this.mysqlClient.executeSQLQueryParams(sql, [studentEnrolment, sectionCode]) as unknown as ResultSetHeader;
         
            return results.affectedRows >= 1;
        } catch (error: any) {
            if (error?.code && error.code == "ER_DUP_ENTRY") {
                new BusinessExceptions("estudante já existe nessa turma", "duplicateEntity", 400);
            }
            throw error
        }

    }

    async removeStudentInSection(sectionCode: number, studentEnrolment: number): Promise<boolean> {
        const sql = `delete from students_sections where studentEnrolment = ? AND sectionCode = ?;`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [studentEnrolment, sectionCode]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }



} 
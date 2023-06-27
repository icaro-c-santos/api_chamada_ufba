import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import { Pagination } from "../../types/Pagination";
import { CreateSubjectDto } from "./models/createSubject.dto";
import Subject from "./models/subject.entity";

export default class SubjectRepository {

    protected mysqlClient: MysqlClient;
    constructor() {
        this.mysqlClient = new MysqlClient();
    }

    async createSubject(createSubjectDto: CreateSubjectDto): Promise<Subject> {
        const { name, subject_load } = createSubjectDto;
        const sql = `INSERT INTO subjects (name,subject_load) values (?,?);`;

        const results = await this.mysqlClient.executeSQLQueryParams(sql, [name, subject_load]) as unknown as ResultSetHeader;

        return {
            code: results.insertId,
            name: name,
            subject_load: subject_load
        }
    }

    async getAllSubjects({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Subject[]> {
        const offset = (page - 1) * pageSize;
        const sql = `select * from subjects LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [pageSize, offset]);
        return results as Subject[];
    }

    async getSubjectByName(data: { subjectName: string } & Pagination): Promise<Subject[]> {
        const { page = 1, pageSize = 25, subjectName } = data;
        const namePattern = `%${subjectName}%`
        const offset = (page - 1) * pageSize;
        const sql = `select * from subjects where name like ? LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [namePattern, pageSize, offset]);
        return results as Subject[];
    }

    async getSubjectByCode(subjectCode: string): Promise<Subject | null> {
        const sql = `select * from subjects where code = ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [subjectCode]);
        return results[0] as Subject || null;
    }

    async deleteRoom(subjectCode: string): Promise<boolean> {
        const sql = `delete from subjects where code = ?;`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [subjectCode]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }
}
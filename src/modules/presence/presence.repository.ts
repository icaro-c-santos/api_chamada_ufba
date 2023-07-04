import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import CreatePresenceDto from "./models/createPresence.dto";
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";
import DeletePresenceDto from "./models/deletePresence.dto";
import UpdatePresenceDto from "./models/updatePresence.dto";
import { Pagination } from "../../types/Pagination";
import Presence from "./models/presence.entity";
import PresenceDto from "./models/presence.dto";
import { formatarData } from "../Client/utils";


export interface FiltersPresence extends Pagination {
    date?: Date,
    status?: number,
    scheduleCode?: number,
    studentEnrolment?: number,
    sectionCode?: number
    name?: string
}

export default class PresenceRepository {

    protected mysqlClient: MysqlClient;
    constructor() {
        this.mysqlClient = new MysqlClient();
    }


    async getPresenceByFilter(data: FiltersPresence) {
        const { page = 1, pageSize = 25, date, scheduleCode, status, studentEnrolment, sectionCode, name } = data;
        const values: (number | Date | string)[] = [];
        const filters: string[] = [];



        if (date) {
            date.setDate(date.getDate() + 1)
            const newDATE = formatarData(date.toString());
            if (newDATE) {
                filters.push('presences.date = ?');
                values.push(newDATE);
            }


        }

        if (name! + null && name?.length != null && name.length > 0) {
            filters.push("persons.name like ?")
            values.push(`%${name}%`);
        }
        if (scheduleCode) {
            filters.push('presences.scheduleCode = ?');
            values.push(scheduleCode);
        }

        if (status) {
            filters.push('presences.status = ?');
            values.push(status);
        }

        if (studentEnrolment) {
            filters.push('presences.studentEnrolment = ?');
            values.push(studentEnrolment);
        }

        if (sectionCode) {
            filters.push('schedules.sectionCode = ?');
            values.push(sectionCode);
        }

        const offset = (page - 1) * pageSize;
        values.push(pageSize, offset);


        const sql = `SELECT status.value AS status, subjects.name as subjectName,schedules.code as code, subjects.subject_load as subjectLoad, status.id AS statusId, students.enrolment, persons.*, date, sectionCode, (schedules.end_time - schedules.start_time) AS load_presence  
        FROM presences
        INNER JOIN students ON presences.studentEnrolment = students.enrolment
        INNER JOIN persons ON persons.cpf = students.cpf
        INNER JOIN status ON status.id = presences.status
        INNER JOIN schedules ON presences.scheduleCode = schedules.code
        INNER JOIN sections ON schedules.sectionCode = sections.code
        INNER JOIN subjects ON subjects.code = sections.subject 
        ${filters.length > 0 ? "WHERE " + filters.join(" AND ") : ""}
        ORDER BY date DESC LIMIT ? OFFSET ? ;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, values) as unknown;
        return results as PresenceDto[];
    }



    async createPresence(createPresenceDto: CreatePresenceDto): Promise<boolean> {
        const { date, scheduleCode, status, studentEnrolment } = createPresenceDto;
        const sql = `INSERT INTO presences (date, scheduleCode, status, studentEnrolment)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status);`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [date, scheduleCode, status, studentEnrolment]) as unknown as ResultSetHeader;
   
        return results.affectedRows >= 1;
    }


    async deletePresence(deletePresenceDto: DeletePresenceDto) {
        const { date, scheduleCode, studentEnrolment } = deletePresenceDto;
        const sql = `DELETE presences WHERE date = ? AND scheduleCode = ? AND studentEnrolment = ?`;

        const results = await this.mysqlClient.executeSQLQueryParams(sql, [date, scheduleCode, studentEnrolment]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;


    }

    async updatePresence(updatePresenceDto: UpdatePresenceDto) {
        const { date, scheduleCode, studentEnrolment, status } = updatePresenceDto;
        const sql = `UPDATE schedules SET status = ? WHERE date = ? AND scheduleCode = ? AND studentEnrolment = ?`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [status, date, scheduleCode, studentEnrolment]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }



}
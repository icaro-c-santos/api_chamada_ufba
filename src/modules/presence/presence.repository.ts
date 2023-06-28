import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import CreatePresenceDto from "./models/createPresence.dto";
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";
import DeletePresenceDto from "./models/deletePresence.dto";
import UpdatePresenceDto from "./models/updatePresence.dto";
import { Pagination } from "../../types/Pagination";
import Presence from "./models/presence.entity";
import PresenceDto from "./models/presence.dto";


export interface FiltersPresence extends Pagination {
    date?: Date,
    status?: number,
    scheduleCode?: number,
    studentEnrolment?: number,
}

export default class SubjectRepository {

    protected mysqlClient: MysqlClient;
    constructor() {
        this.mysqlClient = new MysqlClient();
    }


    async getPresenceByFilter(data: FiltersPresence) {
        const { page = 1, pageSize = 25, date, scheduleCode, status, studentEnrolment } = data;
        const values: (number | Date)[] = [];
        const filters: string[] = [];


        if (date) {
            filters.push('presences.date = ?');
            values.push(date);
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

        const offset = (page - 1) * pageSize;
        values.push(pageSize, offset);

        const sql = `Select status.value as statusValue  , status.id as statusId,students.enrolment,persons.*,date,sectionCode  from presences inner join students on presences.studentEnrolment = students.enrolment inner join persons on 
        persons.cpf = students.cpf inner join status on status.id = presences.status inner join schedules on
         presences.scheduleCode = schedules.code inner join sections on schedules.sectionCode = sections.code ${filters.join(', ')} LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [values]) as unknown;
        return results as PresenceDto[];
    }



    async createPresence(createPresenceDto: CreatePresenceDto): Promise<boolean> {
        const { date, scheduleCode, status, studentEnrolment } = createPresenceDto;
        const sql = `INSERT INTO presences (status,scheduleCode,studentEnrolment,date) values (?,?,?,?);`;
        try {
            const results = await this.mysqlClient.executeSQLQueryParams(sql, [date, scheduleCode, status, studentEnrolment]) as unknown as ResultSetHeader;
            return results.affectedRows >= 1;
        } catch (error: any) {
            if (error?.code && error.code == "ER_DUP_ENTRY") {
                new BusinessExceptions("presença para esse horario dessa turma e aluno já cadastrada", "duplicateEntity", 400);
            }
            throw error
        }

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
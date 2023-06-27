import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import { Pagination } from "../../types/Pagination";
import { CreateScheduleDto } from "./models/createSchedule.dto";
import { ScheduleDto } from "./models/schedule.dto";
import Schedule from "./models/schedule.entity";

export interface FiltersSchedule extends Pagination {
    start_time?: number
    end_time?: number
    day?: number

}
export default class ScheduleRepository {

    protected mysqlClient: MysqlClient;
    constructor() {
        this.mysqlClient = new MysqlClient();
    }

    async createSchedule(createScheduleDto: CreateScheduleDto): Promise<number> {

        const { day, start_time, end_time, roomCode, sectionCode } = createScheduleDto;
        const sql = `INSERT INTO schedules (start_time,end_time,day,sectionCode,roomCode) values (?,?,?,?,?);`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [start_time, end_time, day, sectionCode, roomCode]) as unknown as ResultSetHeader;
        return results.insertId as number;
    }

    async getAllSchedules({ page = 1, pageSize = 25 }: Pagination = {}): Promise<ScheduleDto[]> {
        const offset = (page - 1) * pageSize;
        const sql = `select * from schedules LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [pageSize, offset]) as unknown as Schedule[];
        return results.map(result => new ScheduleDto(result)) as ScheduleDto[];
    }

    async getScheduleByFilters(data: FiltersSchedule): Promise<ScheduleDto[]> {
        const { page = 1, pageSize = 25, day, end_time, start_time } = data;
        const values: (string | number)[] = [];
        const filters: string[] = [];

        if (day) {
            filters.push('day = ?');
            values.push(day);
        }

        if (end_time) {
            filters.push('end_time = ?');
            values.push(end_time);
        }

        if (start_time) {
            filters.push('start_time = ?');
            values.push(start_time);
        }

        const offset = (page - 1) * pageSize;
        values.push(pageSize, offset);

        const sql = `select * from schedule where ${filters.join(', ')} LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [values]) as unknown as Schedule[];
        return results.map(result => new ScheduleDto(result)) as ScheduleDto[];
    }

    async getScheduleByCode(scheduleCode: number): Promise<ScheduleDto | null> {
        const sql = `select * from schedules where code = ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [scheduleCode]);
        if (results.length == 0 || results[0] == null) {
            return null;
        }
        return new ScheduleDto(results[0] as unknown as Schedule);
    }

    async deleteSchedule(scheduleCode: number): Promise<boolean> {
        const sql = `delete from schedules where code = ?;`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [scheduleCode]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }
} 
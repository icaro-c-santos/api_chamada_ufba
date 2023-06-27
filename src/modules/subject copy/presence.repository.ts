import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import CreatePresenceDto from "./models/createPresence.dto";
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";

export default class SubjectRepository {

    protected mysqlClient: MysqlClient;
    constructor() {
        this.mysqlClient = new MysqlClient();
    }

    async createPresence(CreatePresenceDto: CreatePresenceDto): Promise<boolean> {
        const { date, scheduleCode, status, studentEnrolment } = CreatePresenceDto;
        const sql = `INSERT INTO presences (status,scheduleCode,studentEntolment,date) values (?,?,?,?);`;
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

}
import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";
import { createProfessorDto } from "./models/createProfessor.dto";
import { Professor } from "./models/professor.entity";
import { Pagination } from "../../types/Pagination";
import { UpdateProfessorDto } from "./models/updateProfessor.dto";

export default class ProfessorRepository {

    protected mysqlClient: MysqlClient;

    constructor() {
        this.mysqlClient = new MysqlClient();
    }

    async createProfessor(createProfessorDto: createProfessorDto): Promise<Professor> {
        const connection = this.mysqlClient.connection();
        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    console.error('Erro ao iniciar a transação:', err);
                    reject(err);
                    return;
                }

                const sqlPerson = `INSERT INTO persons (cpf,email,name,phone) VALUES (?,?,?,?)`;
                const sqlPersonParameters = Object.values(createProfessorDto);
                connection.query(sqlPerson, sqlPersonParameters, (err, results) => {
                    if (err) {
                        connection.rollback(() => {
                            connection.end();
                        });
                        if (err?.code && err.code == "ER_DUP_ENTRY") {
                            reject(new BusinessExceptions("cpf já cadastrado", "duplicateEntity", 400));
                        } else {
                            reject(err);
                        }
                        return;
                    }

                    const sqlProfessor = `INSERT INTO professors (cpf) VALUES(?)`;
                    const sqlProfessorParameters = [createProfessorDto.cpf];
                    connection.query(sqlProfessor, sqlProfessorParameters, (err, results) => {
                        if (err) {
                            connection.rollback(() => {
                                connection.end();
                            });
                            reject(err);
                            return;
                        }

                        connection.commit((err) => {
                            if (err) {
                                connection.rollback(() => {
                                    connection.end();
                                });
                                reject(err);
                            } else {
                                connection.end();

                                const { insertId } = results as ResultSetHeader;
                                resolve({
                                    ...createProfessorDto, code: insertId
                                });
                            }
                        });
                    });
                });
            });
        });
    }

    async getAllProfessor({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Professor[]> {

        const offset = (page - 1) * pageSize;
        const sql = `select * from professors inner join persons on professors.cpf = persons.cpf LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [pageSize, offset]);
        return results as Professor[];
    }

    async getProfessorByName(data: { nameProfessor: string } & Pagination): Promise<Professor[]> {
        const { page = 1, pageSize = 25, nameProfessor } = data;
        const namePattern = `%${nameProfessor}%`
        const offset = (page - 1) * pageSize;
        const sql = `select * from professors inner join persons on professors.cpf = persons.cpf where name like ? LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [namePattern, pageSize, offset]);
        return results as Professor[];
    }

    async getProfessorByCpf(ProfessorCpf: string): Promise<Professor | null> {
        const sql = `select * from professors inner join persons on professors.cpf = persons.cpf where professors.cpf = ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [ProfessorCpf]);
        return results[0] as Professor || null;
    }

    async getProfessorByCode(ProfessorEnrolment: string): Promise<Professor | null> {
        const sql = `select * from professors inner join persons on professors.cpf = persons.cpf where professors.enrolments = ?;`
        const [error, results, fields] = await this.mysqlClient.executeSQLQueryParams(sql, [ProfessorEnrolment]);
        return results[0] as Professor || null;
    }

    async updateProfessor(cpfProfessor: string, updateProfessorDto: UpdateProfessorDto): Promise<boolean> {
        const { name, email, phone } = updateProfessorDto;
        const values: (string | number)[] = [];
        const fieldsToUpdate: string[] = [];

        if (name) {
            fieldsToUpdate.push('name = ?');
            values.push(name);
        }

        if (email) {
            fieldsToUpdate.push('email = ?');
            values.push(email);
        }

        if (phone) {
            fieldsToUpdate.push('phone = ?');
            values.push(phone);
        }

        const sql = `UPDATE persons SET ${fieldsToUpdate.join(', ')} WHERE cpf = ?`;
        values.push(cpfProfessor);
        const results = await this.mysqlClient.executeSQLQueryParams(sql, values) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }

    async deleteProfessor(ProfessorCpf: string): Promise<boolean> {
        const sql = `delete from professors where cpf = ?;`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [ProfessorCpf]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }

}
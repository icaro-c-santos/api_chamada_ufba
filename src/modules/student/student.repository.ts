import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";
import { createStudentDto } from "./models/createStudent.dto";
import { Student } from "./models/student.entity";
import { Pagination } from "../../types/Pagination";
import { UpdateStudentDto } from "./models/updateStudent.dto";

export default class StudentRepository {

    protected mysqlClient: MysqlClient;

    constructor() {
        this.mysqlClient = new MysqlClient();
    }

    async createStudent(createStudentDto: createStudentDto): Promise<Student> {
        const connection = this.mysqlClient.connection();
        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    console.error('Erro ao iniciar a transação:', err);
                    reject(err);
                    return;
                }

                const sqlPerson = `INSERT INTO persons (cpf, email, name, phone) VALUES (?, ?, ?, ?)`;
                const sqlPersonParameters = Object.values(createStudentDto);
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

                    const sqlStudent = `INSERT INTO students (cpf) VALUES (?)`;
                    const sqlStudentParameters = [createStudentDto.cpf];
                    connection.query(sqlStudent, sqlStudentParameters, (err, results) => {
                        if (err) {
                            connection.rollback(() => {
                                connection.end();
                            });
                            reject(err);
                            return;
                        }

                        //@ts-ignore
                        const enrolment = results.insertId;

                        const sqlUser = `INSERT INTO user (login, senha, token, enrolment) VALUES (?, ?, ?, ?)`;
                        const sqlUserParameters = [createStudentDto.cpf, "1234", enrolment + 1234, enrolment];
                        connection.query(sqlUser, sqlUserParameters, (err, results) => {
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
                                    resolve({ ...createStudentDto, enrolment });
                                }
                            });
                        });
                    });
                });
            });
        });
    }


    async getAllStudent({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Student[]> {

        const offset = (page - 1) * pageSize;
        const sql = `select * from students inner join persons on students.cpf = persons.cpf LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [pageSize, offset]);
        return results as Student[];
    }

    async getStudentByName(data: { nameStudent: string } & Pagination): Promise<Student[]> {
        const { page = 1, pageSize = 25, nameStudent } = data;
        const namePattern = `%${nameStudent}%`
        const offset = (page - 1) * pageSize;
        const sql = `select * from students inner join persons on students.cpf = persons.cpf where name like ? LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [namePattern, pageSize, offset]);
        return results as Student[];
    }

    async getStudentByCpf(studentCpf: string): Promise<Student | null> {
        const sql = `select * from students inner join persons on students.cpf = persons.cpf where students.cpf = ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [studentCpf]);
        return results[0] as Student || null;
    }

    async getStudentByEnrolment(studentEnrolment: string): Promise<Student | null> {
        const sql = `select * from students inner join persons on students.cpf = persons.cpf where students.enrolment = ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [parseInt(studentEnrolment)]);


        return results[0] as Student | null
    }

    async updateStudent(cpfStudent: string, updateStudentDto: UpdateStudentDto): Promise<boolean> {
        const { name, email, phone } = updateStudentDto;
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
        values.push(cpfStudent);
        const results = await this.mysqlClient.executeSQLQueryParams(sql, values) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }

    async deleteStudent(studentCpf: string): Promise<boolean> {
        const sql = `delete from students where cpf = ?;`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [studentCpf]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }





}
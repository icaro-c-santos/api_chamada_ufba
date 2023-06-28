import { Pagination } from "../../types/Pagination";
import { createStudentDto } from "./models/createStudent.dto";
import { Student } from "./models/student.entity";
import { UpdateStudentDto } from "./models/updateStudent.dto";
import StudentRepository from "./student.repository";

export default class StudentService {
    private studentRepository: StudentRepository

    constructor() {
        this.studentRepository = new StudentRepository();
    }

    async createStudent(create: createStudentDto): Promise<Student> {
        const student = await this.studentRepository.createStudent(create);
        return student;
    }

    async getAllStudent({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Student[]> {
        const students = await this.studentRepository.getAllStudent();
        return students;
    }

    async getStudentByName(data: { nameStudent: string } & Pagination): Promise<Student[]> {
        const student = await this.studentRepository.getStudentByName(data);
        return student;
    }

    async getStudentByCpf(cpf: string): Promise<Student | null> {
        const student = await this.studentRepository.getStudentByCpf(cpf);
        return student;
    }

    async getStudentByEnrolment(studentEnrolment: string): Promise<Student | null> {
        const student = await this.studentRepository.getStudentByEnrolment(studentEnrolment);
        return student;
    }

    async updateStudent(cpf: string, update: UpdateStudentDto): Promise<boolean> {
        const student = await this.studentRepository.updateStudent(cpf, update);
        return student;
    }

    async deleteStudent(cpf: string): Promise<boolean> {
        const deletedStudent = await this.studentRepository.deleteStudent(cpf);
        return deletedStudent;
    }
}
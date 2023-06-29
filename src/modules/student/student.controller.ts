import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import StudentService from "./student.service";
import { createStudentDto } from "./models/createStudent.dto";
import { Student } from "./models/student.entity";
import { UpdateStudentDto } from "./models/updateStudent.dto";

export default class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    async createStudent(req: Request, res: Response): Promise<Student | undefined> {
        const studentData = req.body;

        const student = plainToClass(createStudentDto, studentData);

        const errors = await validate(student);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const createStudent = await this.studentService.createStudent(student);

        res.status(200).json({ teacher: createStudent });
    }

    async getAllStudent(req: Request, res: Response): Promise<void> {
        const students = await this.studentService.getAllStudent();
        res.status(200).json({ students });
    }

    async getStudentByName(req: Request, res: Response): Promise<Student[] | undefined> {
        const studentName = req.body.name;

        const student = await this.studentService.getStudentByName(studentName);

        if (!student) {
            res.status(404).json({ error: "Estudante não encontrado" });
            return;
        }

        res.status(200).json({ student });
    }

    async getStudentByCpf(req: Request, res: Response): Promise<Student | undefined> {
        const studentCPF = req.body.cpf;

        const student = await this.studentService.getStudentByCpf(studentCPF);

        if (!student) {
            res.status(404).json({ error: "Estudante não encontrado" });
            return;
        }

        res.status(200).json({ student });
    }

    async getStudentByEnrolment(req: Request, res: Response): Promise<Student | undefined> {
        const studentEnrolment = req.body.enrolment;

        const student = await this.studentService.getStudentByEnrolment(studentEnrolment);

        if (!student) {
            res.status(404).json({ error: "Estudante não encontrado" });
            return;
        }

        res.status(200).json({ student });
    }

    async updateStudent(req: Request, res: Response): Promise<boolean | undefined> {
        const studentCPF = req.body.cpf;
        const studentData = req.body;

        const student = plainToClass(UpdateStudentDto, studentData);

        const errors = await validate(student);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const studentUpdated = await this.studentService.updateStudent(studentCPF, studentData);

        if (!studentUpdated) {
            res.status(404).json({ error: "Estudante não encontrado" });
            return;
        }
        res.status(200).json({ student: studentUpdated });
    }

    async deleteStudent(req: Request, res: Response): Promise<boolean | undefined> {
        const studentCPF = req.body.cpf;

        const deletedStudent = await this.studentService.deleteStudent(studentCPF);

        if (!deletedStudent) {
            res.status(404).json({ error: "Estudante não encontrado" });
            return;
        }

        res.status(200).json({ message: "Estudante excluído com sucesso" });
    }
}

import { plainToClass } from "class-transformer";
import { Professor } from "./models/professor.entity";
import ProfessorService from "./professor.service";
import { createProfessorDto } from "./models/createProfessor.dto";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { UpdateProfessorDto } from "./models/updateProfessor.dto";



export default class ProfessorController {
    private professorService: ProfessorService;

    constructor() {
        this.professorService = new ProfessorService();
    }

    async createProfessor(req: Request, res: Response): Promise<Professor | undefined> {
        const teacherData = req.body;

        const teacher = plainToClass(createProfessorDto, teacherData);

        const errors = await validate(teacher);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const createProfessor = await this.professorService.createProfessor(teacher);

        res.status(200).json({ teacher: createProfessor });
    }

    async getAllProfessor(req: Request, res: Response): Promise<void> {
        const teachers = await this.professorService.getAllProfessor();
        res.status(200).json({ teachers });
    }

    async getProfessorByName(req: Request, res: Response): Promise<Professor[] | undefined> {
        const teacherName = req.body.name;

        const teacher = await this.professorService.getProfessorByName(teacherName);

        if (!teacher) {
            res.status(404).json({ error: "Professor não encontrado" });
            return;
        }

        res.status(200).json({ teacher });
    }


    async getProfessorByCpf(req: Request, res: Response): Promise<Professor[] | undefined> {
        const teacherCPF = req.body.cpf;

        const teacher = await this.professorService.getProfessorByCpf(teacherCPF);

        if (!teacher) {
            res.status(404).json({ error: "Professor não encontrado" });
            return;
        }

        res.status(200).json({ teacher });

    }

    async getProfessorByCode(req: Request, res: Response): Promise<Professor[] | undefined> {
        const teacherCode = req.body.code;

        const teacher = await this.professorService.getProfessorByCode(teacherCode);

        if (!teacher) {
            res.status(404).json({ error: "Professor não encontrado" });
            return;
        }

        res.status(200).json({ teacher });

    }

    async updateProfessor(req: Request, res: Response): Promise<Professor | undefined> {
        const teacherCPF = req.body.cpf;
        const teacherData = req.body;

        const teacher = plainToClass(UpdateProfessorDto, teacherData);

        const errors = await validate(teacher);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const teacherUpdated = await this.professorService.updateProfessor(teacherCPF, teacherData);

        if (!teacherUpdated) {
            res.status(404).json({ error: "Professor não encontrado" });
            return;
        }
        res.status(200).json({ teacher: teacherUpdated });

    }

    async deleteProfessor(req: Request, res: Response): Promise<Professor | undefined> {

        const teacherCPF = req.body.id;

        const deletedTeacher = await this.professorService.deleteProfessor(teacherCPF);

        if (!deletedTeacher) {
            res.status(404).json({ error: "Professor não encontrado" });
            return;
        }

        res.status(200).json({ message: "Professor excluído com sucesso" });
    }
}







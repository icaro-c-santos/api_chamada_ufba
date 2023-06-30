import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import SectionService from "./section.service";
import Section from "./models/section.entity";
import { CreateSectionDto } from "./models/createSection.dto";
import { Professor } from "../professor/models/professor.entity";
import { Student } from "../student/models/student.entity";


export default class SectionController {
    private sectionService: SectionService;

    constructor() {
        this.sectionService = new SectionService();
    }

    async createSection(req: Request, res: Response): Promise<Section | undefined> {
        const sectionData = req.body;

        const section = plainToClass(CreateSectionDto, sectionData);

        const errors = await validate(section);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const createSection = await this.sectionService.createSection(section);

        res.status(200).json({ section: createSection });
    }

    async getAllSections(req: Request, res: Response): Promise<void> {
        const sections = await this.sectionService.getAllSections();
        res.status(200).json({ sections });
    }

    async getProfessorsInSection(req: Request, res: Response): Promise<Professor[] | undefined> {
        const sectionCode = req.body.code;

        const teacher = await this.sectionService.getProfessorsInSection(sectionCode);

        if (!teacher) {
            res.status(404).json({ error: "Professor não encontrado na sessão" });
            return;
        }

        res.status(200).json({ teacher });

    }

    async getStudentsInSection(req: Request, res: Response): Promise<Student[] | undefined> {
        const sectionCode = req.body.code;

        const student = await this.sectionService.getStudentsInSection(sectionCode);

        if (!student) {
            res.status(404).json({ error: "Estudante não encontrado na sessão" });
            return;
        }

        res.status(200).json({ student });

    }

    async addProfessorInSection(req: Request, res: Response): Promise<void> {

        const { sectionCode, teacherCode } = req.body;

        const result = await this.sectionService.addProfessorInSection(sectionCode, teacherCode);

        res.json({ success: result });

    }

    async removeProfessorInSection(req: Request, res: Response): Promise<boolean | undefined> {
        const { sectionCode, teacherCode } = req.body;

        if (typeof sectionCode !== 'number' || typeof teacherCode !== 'number') {
            res.status(400).json({ error: 'Sessão inválida ou código do professor inválido' });
            return;
        }

        const result = await this.sectionService.removeProfessorInSection(sectionCode, teacherCode);

        res.json({ success: result });
    }

    async addStudentInSection(req: Request, res: Response): Promise<void> {
        const { sectionCode, studentCode } = req.body;

        const result = await this.sectionService.addStudentInSection(sectionCode, studentCode);

        res.json({ success: result });
    }

    async removeStudentInSection(req: Request, res: Response): Promise<boolean | undefined> {
        const { sectionCode, studentCode } = req.body;

        if (typeof sectionCode !== 'number' || typeof studentCode !== 'number') {
            res.status(400).json({ error: 'Sessão inválida ou código do aluno inválido' });
            return;
        }

        const result = await this.sectionService.removeStudentInSection(sectionCode, studentCode);

        res.json({ success: result });
    }
}




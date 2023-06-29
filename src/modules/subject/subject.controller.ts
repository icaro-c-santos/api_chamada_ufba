import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import SubjectService from "./subject.service";
import { CreateSubjectDto } from "./models/createSubject.dto";
import Subject from "./models/subject.entity";


export default class SubjectController {
    private subjectService: SubjectService;

    constructor() {
        this.subjectService = new SubjectService();
    }
    async createSubject(req: Request, res: Response): Promise<Subject | undefined> {
        const subjectData = req.body;

        const subject = plainToClass(CreateSubjectDto, subjectData);

        const errors = await validate(subject);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const createSubject = await this.subjectService.createSubject(subject);

        res.status(200).json({ subject: createSubject });
    }

    async getAllSubjects(req: Request, res: Response): Promise<void> {
        const subjects = await this.subjectService.getAllSubjects();
        res.status(200).json({ subjects });
    }

    async getSubjectByName(req: Request, res: Response): Promise<Subject[] | undefined> {
        const subjectName = req.body.name;

        const subject = await this.subjectService.getSubjectByName(subjectName);

        if (!subject) {
            res.status(404).json({ error: "Disciplina não encontrada" });
            return;
        }

        res.status(200).json({ subject });
    }

    async getSubjectByCode(req: Request, res: Response): Promise<Subject | undefined> {
        const subjectCode = req.body.code;

        const subject = await this.subjectService.getSubjectByCode(subjectCode);

        if (!subject) {
            res.status(404).json({ error: "Disciplina não encontrada" });
            return;
        }

        res.status(200).json({ subject });
    }

    async deleteRoom(req: Request, res: Response): Promise<boolean | undefined> {
        const { subjectCode } = req.body.code;

        const roomDeleted = await this.subjectService.deleteRoom(subjectCode);

        if (!roomDeleted) {
            res.status(404).json({ message: 'Room not found.' });
            return; 
          } 
          
        res.status(200).json({ message: 'Room deleted successfully.' });
        res.json({ success: roomDeleted });
    }
}


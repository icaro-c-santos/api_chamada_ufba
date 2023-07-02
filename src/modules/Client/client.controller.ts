
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { Professor } from "../professor/models/professor.entity";
import { Student } from "../student/models/student.entity";
import ClientService from "./client.service";
import SectionService from "../section/section.service";



export default class ClientController {
    private clientService: ClientService;
    private sectionService: SectionService;
    constructor() {
        this.clientService = new ClientService();
        this.sectionService = new SectionService();

    }

    async getDataSectionSelfUser(req: Request, res: Response) {

        const teacher = 369;
        try {
            const data = await this.clientService.getAllSectionsTeacher({
                page: 1,
                teacherCode: teacher,
                pageSize: 100
            })

            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send();
        }
    }
    async getDataSection(req: Request, res: Response) {
        const code = parseInt(req.params.code);
        const data = await this.sectionService.getDataSection(code);
        if (!data) {
            res.status(404).json({ error: "NÃO FOI POSSÍVEL OBTER OS DADOS DA TURMA!" });
            return;
        }
        res.status(200).json(data);
    }


    async getPresencesOfSection(req: Request, res: Response) {

        res.status(200).json();

    }

}
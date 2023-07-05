
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { Professor } from "../professor/models/professor.entity";
import { Student } from "../student/models/student.entity";
import ClientService from "./client.service";
import SectionService from "../section/section.service";
import CreatePresenceDto from "../presence/models/createPresence.dto";
import { formatarData } from "./utils";

export type Filters = {
    page?: number,
    pageSize?: number,
    sectionCode?: number,
    date?: Date,
    name?: string,
    studentEnrolment?: number
}



export default class ClientController {
    private clientService: ClientService;
    private sectionService: SectionService;
    constructor() {
        this.clientService = new ClientService();
        this.sectionService = new SectionService();

    }

    async getDataSectionProfessor(req: Request, res: Response) {


        let professorCode;
        //@ts-ignore
        console.log("USER ->", req.user);
        //@ts-ignore
        if (req.user != null && req.user.codeProfessor != null) {
            //@ts-ignore
            professorCode = req.user.codeProfessor;
        }
        //@ts-ignore


        if (!professorCode) {
            return res.status(401).send();
        }







        try {
            const data = await this.clientService.getAllSectionsTeacher({
                page: 1,
                teacherCode: professorCode,
                pageSize: 100
            })

            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send();
        }



    }

    async getPresencesOfStudent(req: Request, res: Response) {
        const { id } = req.params;

        let enrolment;


        //@ts-ignore
        if (req.user != null && req.user.enrolment != null) {
            //@ts-ignore
            enrolment = req.user.enrolment;
        }
        //@ts-ignore
        console.log(req.user);

        if (!enrolment) {
            return res.status(401).send();
        }



        const data = await this.clientService.getAllPresencesOfStudent({
            enrolment: enrolment,
            sectionCode: parseInt(id)
        })


        res.status(200).json(data);
    }

    async getDataSectionStudents(req: Request, res: Response) {


        try {
            let enrolment;


            //@ts-ignore
            if (req.user != null && req.user.enrolment != null) {
                //@ts-ignore
                enrolment = req.user.enrolment;
            }
            //@ts-ignore

            if (!enrolment) {
                return res.status(401).send();
            }
            const data = await this.clientService.getAllSectionsStudent({
                page: 1,
                enrolment: enrolment,
                pageSize: 100
            })

            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send();
        }
        ;

    }



    async getDataSection(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return res.status(404).json({
                    error: {
                        message: "CÓDIGO DA TURMA INVALIDO!"
                    }
                })
            }
            const data = await this.sectionService.getDataSection(id);
            if (!data) {
                res.status(404).json({ error: "NÃO FOI POSSÍVEL OBTER OS DADOS DA TURMA!" });
                return;
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getPresencesOfSection(req: Request, res: Response) {
        try {


            const { page, pageSize, sectionCode = null, date = null, studentEnrolment = null, name = null } = req.query;

            const { id } = req.params;
            let filters: Filters = {}
            if (page && !isNaN(parseInt(page.toString()))) {
                filters.page = parseInt(page.toString());
            }

            if (pageSize && !isNaN(parseInt(pageSize.toString()))) {
                filters.pageSize = parseInt(pageSize.toString());
            }

            if (id && !isNaN(parseInt(id))) {
                filters.sectionCode = parseInt(id);
            }


            if (date != null) {
                let newDate = formatarData(date.toString() || "");
                if (newDate) {
                    filters.date = new Date(date.toString());
                }

            }

            if (studentEnrolment != null) {
                let enrolment = parseInt(studentEnrolment.toString());
                if (!isNaN(enrolment) && enrolment > 0) {
                    filters.studentEnrolment = parseInt(studentEnrolment.toString());
                }

            }


            if (name) {
                //@ts-ignore
                filters.name = name;
            }
            const data = await this.clientService.getAllPresencesOfSection(filters);

            return res.status(200).json(data);


        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }

    }

    async updatePresence(req: Request, res: Response) {
        try {
            const createPresenceDto = new CreatePresenceDto();
            const { date, code, status, enrolment } = req.body;
            createPresenceDto.date = date;
            createPresenceDto.scheduleCode = code;
            createPresenceDto.status = status;
            createPresenceDto.studentEnrolment = enrolment;
            const presence = plainToClass(CreatePresenceDto, createPresenceDto);
            const errors = await validate(presence);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }



            await this.clientService.createPresence(presence)
            return res.status(200).send();
        } catch (error) {

            return res.status(500).send();
        }

    }

    async createPresence(req: Request, res: Response) {
        try {
            const createPresenceDto = new CreatePresenceDto();
            const { date, code, status, enrolment } = req.body;
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1)
            createPresenceDto.date = newDate;
            createPresenceDto.scheduleCode = parseInt(code);
            createPresenceDto.status = status;
            createPresenceDto.studentEnrolment = enrolment;
            const presence = plainToClass(CreatePresenceDto, createPresenceDto);
            const errors = await validate(presence);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }



            await this.clientService.createPresence(presence)
            return res.status(200).send();
        } catch (error) {

            return res.status(500).send();
        }

    }

    async getDataSectionOfStudent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            let enrolment;
            //@ts-ignore
            if (req.user != null && req.user.enrolment != null) {
                //@ts-ignore
                enrolment = req.user.enrolment;
            }
            //@ts-ignore

            if (!enrolment) {
                return res.status(401).send();
            }


            const data = await this.clientService.getDataSectionOfStudent(parseInt(id), enrolment);

            res.status(200).json(data);
        } catch (error) {

            res.status(500).json();
        }

    }


    async login(req: Request, res: Response) {

        try {
            const { user, password } = req.body;

            if (!user || !password) {
                res.status(401).send()
            }

            const userLogin = await this.clientService.getUser(user, password);

            if (!userLogin) {
                res.status(401).send()
            }

            return res.status(200).json(userLogin);
        } catch (error) {
            console.log(error);
            res.status(500).send()
        }
    }

}
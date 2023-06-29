import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import ScheduleService from "./schedule.service";
import { CreateScheduleDto } from "./models/createSchedule.dto";
import { ScheduleDto } from "./models/schedule.dto";

export default class ScheduleController {
    private scheduleService: ScheduleService;

    constructor() {
        this.scheduleService = new ScheduleService();
    }
    async createSchedule(req: Request, res: Response): Promise<number | undefined> {
        const scheduleData = req.body;

        const schedule = plainToClass(CreateScheduleDto, scheduleData);

        const errors = await validate(schedule);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const createSchedule = await this.scheduleService.createSchedule(schedule);

        res.status(200).json({ schedule: createSchedule});
      
    }

    async getAllSchedules(req: Request, res: Response): Promise<void> {
        const schedules = await this.scheduleService.getAllSchedules();
        res.status(200).json({ schedules });
    }

    async getScheduleByFilters(req: Request, res: Response): Promise<ScheduleDto[] | undefined> {
        const scheduleFilters = req.body.filters;

        const schedule = await this.scheduleService.getScheduleByFilters(scheduleFilters);

        if (!schedule) {
            res.status(404).json({ error: "Horário não encontrado" });
            return;
        }

        res.status(200).json({ schedule });
    
    }

    async getScheduleByCode(req: Request, res: Response): Promise<ScheduleDto[] | undefined> {
        const scheduleCode = req.body.code;

        const schedule = await this.scheduleService.getScheduleByCode(scheduleCode);

        if (!schedule) {
            res.status(404).json({ error: "Horário não encontrado" });
            return;
        }

        res.status(200).json({ schedule });
    
    }

    async deleteSchedule(req: Request, res: Response): Promise<boolean | undefined> {
        const scheduleCode = req.body.code;

        const deletedSchedule = await this.scheduleService.deleteSchedule(scheduleCode);

        if (!deletedSchedule) {
            res.status(404).json({ error: "Horário não encontrado" });
            return;
        }

        res.status(200).json({ message: "Horário excluído com sucesso!" });
    }
}
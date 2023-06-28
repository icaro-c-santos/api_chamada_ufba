import { Pagination } from "../../types/Pagination";
import { CreateScheduleDto } from "./models/createSchedule.dto";
import { ScheduleDto } from "./models/schedule.dto";
import ScheduleRepository, { FiltersSchedule } from "./schedule.repository";

export default class ScheduleService {

    protected scheduleRepository: ScheduleRepository

    constructor() {
        this.scheduleRepository = new ScheduleRepository();
    }

    async createSchedule(createScheduleDto: CreateScheduleDto): Promise<number> {
        const schedule = await this.scheduleRepository.createSchedule(createScheduleDto);
        return schedule;
    }

    async getAllSchedules({ page = 1, pageSize = 25 }: Pagination = {}): Promise<ScheduleDto[]> {
        const schedules = await this.scheduleRepository.getAllSchedules();
        return schedules;
    }

    async getScheduleByFilters(data: FiltersSchedule): Promise<ScheduleDto[]> {
        const schedule = await this.scheduleRepository.getScheduleByFilters(data);
        return schedule;
    }

    async getScheduleByCode(code: number): Promise<ScheduleDto | null> {
        const schedule = await this.scheduleRepository.getScheduleByCode(code)
        return schedule; 
    }
    async deleteSchedule(code: number): Promise<boolean> {
        const deletedSchedule = await this.scheduleRepository.deleteSchedule(code);
        return deletedSchedule;
    }
}
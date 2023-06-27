import { CreateScheduleDto } from "./models/createSchedule.dto";
import ScheduleRepository from "./schedule.repository";




export default class ScheduleService {

    protected scheduleRepository: ScheduleRepository


    constructor() {
        this.scheduleRepository = new ScheduleRepository();

    }

    async create(createScheduleDto: CreateScheduleDto): Promise<number> {
        return await this.scheduleRepository.createSchedule(createScheduleDto);
    }

    async delete(scheduleCode: number): Promise<boolean> {
        return await this.scheduleRepository.deleteSchedule(scheduleCode);
    }
}
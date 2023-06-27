
import { convertMinutesToTimeString } from "../utils/convert";

export class ScheduleDto {
    code: number
    start_time: string
    end_time: string
    day: number
    section: number
    room: number

    constructor(data: { code: number, start_time: number, end_time: number, day: number, section: number, room: number }) {
        this.code = data.code;
        this.start_time = convertMinutesToTimeString(data.start_time);
        this.end_time = convertMinutesToTimeString(data.end_time);
        this.day = data.day;
        this.section = data.section;
        this.room = data.room;
    }
}



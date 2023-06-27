
import { convertMinutesToTimeString } from "../utils/convert";

export class ScheduleDto {
    code: number
    start_time: string
    end_time: string
    day: number
    sectionCode: number
    roomCode: number

    constructor(data: { code: number, start_time: number, end_time: number, day: number, sectionCode: number, roomCode: number }) {
        this.code = data.code;
        this.start_time = convertMinutesToTimeString(data.start_time);
        this.end_time = convertMinutesToTimeString(data.end_time);
        this.day = data.day;
        this.sectionCode = data.sectionCode;
        this.roomCode = data.roomCode;
    }
}



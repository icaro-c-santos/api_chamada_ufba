import { IsNotEmpty, IsNumber, Max, Min, } from "class-validator"
import { IsTimeFormat } from "../utils/validator"
import { Transform } from 'class-transformer';

export class CreateScheduleDto {

    @IsNotEmpty()
    @IsTimeFormat()
    @Transform(data => {
        const [hours, minutes] = data.value.split(':');
        return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    })
    start_time: number

    @IsNotEmpty()
    @IsTimeFormat()
    @Transform(data => {
        const [hours, minutes] = data.value.split(':');
        return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    })
    end_time: number

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(6)
    day: number
}
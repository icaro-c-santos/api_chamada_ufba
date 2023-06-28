
import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"


export default class DeletePresenceDto {

    @IsNotEmpty()
    @IsNumber()
    scheduleCode: number

    @IsNotEmpty()
    @IsNumber()
    studentEnrolment: number

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    date: Date


}
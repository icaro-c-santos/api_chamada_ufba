import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from "class-validator"


export default class CreatePresenceDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(3)
    status: number

    @IsNotEmpty()
    @IsNumber()
    scheduleCode: number

    @IsNotEmpty()
    @IsNumber()
    studentEnrolment: number

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    date: Date

}
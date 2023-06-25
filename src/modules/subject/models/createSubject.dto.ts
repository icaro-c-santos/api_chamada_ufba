import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from "class-validator"


export class CreateSubjectDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string

    @IsNotEmpty()
    @IsNumber()
    @Min(900)
    @Max(9999)
    subject_load: number
}
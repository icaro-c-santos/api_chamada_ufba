import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
export class UpdateStudentDto {

    @IsOptional()
    @IsString()
    @MaxLength(50)
    name?: string

    @IsOptional()
    @IsString()
    @IsEmail()
    @MaxLength(50)
    email?: string

    @IsOptional()
    @IsNumber()
    @Min(100000000)
    @MaxLength(999999999)
    phone?: number | null
}
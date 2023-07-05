
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class createStudentDto {

    @IsNotEmpty()
    @MaxLength(11)
    @MinLength(11)
    @IsString()
    cpf: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(50)
    email: string

    @IsOptional()
    @IsNumber()
    @Min(100000000)
    @Max(999999999)
    phone?: number
}
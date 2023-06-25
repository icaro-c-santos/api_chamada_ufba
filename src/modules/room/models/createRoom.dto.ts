import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from "class-validator"


export class CreateRoomDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    paf: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(9999)
    number: number
}
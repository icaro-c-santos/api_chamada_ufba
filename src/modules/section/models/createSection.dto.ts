import { IsNotEmpty, IsNumber, Max, Min, } from "class-validator"
import { IsTimeFormat } from "../utils/validator"
import { Transform } from 'class-transformer';

export class CreateSectionDto {
    subject: number
}
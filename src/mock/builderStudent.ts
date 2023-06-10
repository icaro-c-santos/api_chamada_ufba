import { faker } from "@faker-js/faker";
import { TStudent } from "../types/TStudent";



export const buildStudent = (): TStudent => {


    return {
        name: faker.internet.userName(),
        cpf: faker.number.bigInt({ min: 11111111111, max: 99999999999 }).toString(),
        email: faker.internet.email(),
        matricula: faker.number.bigInt({ min: 11111111111, max: 99999999999 }).toString(),
        telefone: parseInt(faker.number.bigInt({ min: 111111111, max: 999999999 }).toString())
    }

}
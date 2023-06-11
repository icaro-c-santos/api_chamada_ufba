import { TProfessor } from "../types/TProfessor"
import { faker } from "@faker-js/faker";

export const buildProfessor = (): TProfessor => {


    return {
        name: faker.internet.userName(),
        cpf: faker.number.bigInt({ min: 11111111111, max: 99999999999 }).toString(),
        email: faker.internet.email(),
        telefone: parseInt(faker.number.bigInt({ min: 111111111, max: 999999999 }).toString())
    }

}
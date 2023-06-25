
export class Person {
    cpf: string
    name: string
    email: string
    phone?: number

}

export class Student extends Person {
    enrolment: number
}
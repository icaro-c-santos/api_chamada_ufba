import { BusinessExceptions } from "../exceptions";


export type TStudent = {
    cpf: string,
    matricula: string,
    name: string,
    email: string,
    telefone: number | null
}

export type TCreateStudent = TStudent


export const validStudent = (student: TCreateStudent): boolean => {

    if (student.cpf == null) {
        throw new BusinessExceptions("CPF DO ALUNO É NULO!", "invalidCpfStudent", 400);
    }

    if (/^\d{10}$/.test(student.cpf)) {
        console.log(student.cpf);
        throw new BusinessExceptions("CPF DO ALUNO DEVE POSSUIR SOMENTE NUMEROS E 11 DIGITOS", "invalidCpfStudent", 400);
    }

    if (student.email == null || student.email.length <= 6) {
        throw new BusinessExceptions("EMAIL DO ALUNO É INVALIDO VAERIFQUE SE POSSUI PELO MENOS 6 DIGITOS!", "invalidEmailStudent", 400);
    }

    if (student.name == null || student.name.length <= 6) {
        throw new BusinessExceptions("NOME DO ALUNO É INVALIDO VAERIFQUE SE POSSUI PELO MENOS 6 DIGITOS!", "invalidNameStudent", 400);
    }

    if (student.matricula == null) {
        throw new BusinessExceptions("MATRICULA DO ALUNO É NULO!", "invalidMatriculaStudent", 400);
    }

    if (/^\d{10}$/.test(student.matricula)) {
        throw new BusinessExceptions("MATRICULA DO ALUNO DEVE POSSUIR SOMENTE NUMEROS E 11 DIGITOS", "invalidMatriculaStudent", 400);
    }

    if (student.telefone != null && /^\d{8}$/.test(student.telefone.toString())) {
        throw new BusinessExceptions("TELEFONE DO ALUNO DEVE POSSUIR SOMENTE NUMEROS E 9 DIGITOS", "invalidPhoneStudent", 400);
    }

    return true;

}
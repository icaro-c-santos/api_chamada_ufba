import { BusinessExceptions } from "../exceptions";


export type TProfessor = {
    cpf: string,
    matricula: string,
    name: string,
    email: string,
    telefone: number | null
}

export type TCreateProfessor = TProfessor



export const validProfessor = (professor: TCreateProfessor): boolean => {


    if (professor.cpf == null) {
        throw new BusinessExceptions("CPF DO PROFESSOR É NULO!", "invalidCpfprofessor", 400);
    }

    if (/^\d{10}$/.test(professor.cpf)) {
        console.log(professor.cpf);
        throw new BusinessExceptions("CPF DO PROFESSOR DEVE POSSUIR SOMENTE NUMEROS E 11 DIGITOS", "invalidCpfprofessor", 400);
    }

    if (professor.email == null || professor.email.length <= 6) {
        throw new BusinessExceptions("EMAIL DO PROFESSOR É INVALIDO VAERIFQUE SE POSSUI PELO MENOS 6 DIGITOS!", "invalidEmailprofessor", 400);
    }

    if (professor.name == null || professor.name.length <= 6) {
        throw new BusinessExceptions("NOME DO PROFESSOR É INVALIDO VAERIFQUE SE POSSUI PELO MENOS 6 DIGITOS!", "invalidNameprofessor", 400);
    }

    if (professor.telefone != null && /^\d{8}$/.test(professor.telefone.toString())) {
        throw new BusinessExceptions("TELEFONE DO PROFESSOR DEVE POSSUIR SOMENTE NUMEROS E 9 DIGITOS", "invalidPhoneprofessor", 400);
    }

    return true;

}
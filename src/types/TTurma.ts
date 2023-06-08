import { BusinessExceptions } from "../exceptions"



export type TTurma = {
    codigo: string,
    name: string,
    codigoDisciplina: number
}


export type TCreateTurma = Omit<TTurma, "codigo">


export const validTurma = (turma: Partial<TCreateTurma>): boolean => {

    if (turma.name == null) {
        throw new BusinessExceptions("NOME É NULO!", "invalidInput", 400);
    }
    if (turma.name.length <= 2) {
        throw new BusinessExceptions("NOME PRECISA TER PELO MENOS 3 CARACTERES", "invalidInput", 400);
    }

    if (turma.codigoDisciplina == null || turma.codigoDisciplina.toString().length == 0 || isNaN(turma.codigoDisciplina)) {
        throw new BusinessExceptions("CODIGO DA DISCIPLINA INVALIDO!", "invalidInput", 400);
    }

    return true;
}
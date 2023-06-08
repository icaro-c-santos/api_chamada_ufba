import { BusinessExceptions } from "../exceptions";


export type TSubject = {
    codigo: string,
    name: string,
    cargaHoraria: number,
}


export type TCreateSubject = Omit<TSubject, "codigo">


export const validSubject = (subject: TCreateSubject): boolean => {

    if (subject.name == null) {
        throw new BusinessExceptions("NOME É NULO!", "invalidInput", 400);
    }
    if (subject.name.length <= 2) {
        throw new BusinessExceptions("NOME PRECISA TER PELO MENOS 3 CARACTERES", "invalidInput", 400);
    }
    if (subject.cargaHoraria == null || subject.cargaHoraria.toString().length == 0 || isNaN(subject.cargaHoraria)) {
        throw new BusinessExceptions("CARGA HORARIA INVALIDA!", "invalidInput", 400);
    }

    return true;

}
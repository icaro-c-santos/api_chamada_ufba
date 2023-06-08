import { BusinessExceptions } from "../exceptions"




export type TRoom = {
    codigo: string,
    paf: string
    numero: number
}


export type TCreateRoom = Omit<TRoom, "codigo">


export const validRoom = (room: TCreateRoom): boolean => {

    if (room.paf == null || room.paf.length == 0) {
        throw new BusinessExceptions("PAF É NULO!", "invalidInput", 400);
    }

    if (room.numero == null || room.numero.toString().length == 0 || isNaN(room.numero)) {
        throw new BusinessExceptions("NUMERO DA SALA INVALIDO!", "invalidInput", 400);
    }

    return true;
}
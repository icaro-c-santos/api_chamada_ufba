import { dbConnection } from "../data"
import { BusinessExceptions } from "../exceptions";
import { TCreateRoom, validRoom } from "../types/TRoom";

export const createRoom = async (room: TCreateRoom) => {

    const sql = 'INSERT INTO sala (codigo,paf,numero) VALUES (?, ?, ?)';
    validRoom(room);
    return new Promise((resolve, reject) => {
        const idRomm = room.paf.concat(room.numero.toString());
        dbConnection.query(sql, [idRomm, room.paf, room.numero], (error, results: any) => {
            if (error) {
                if (error?.code == `ER_DUP_ENTRY` && error.message.includes("for key 'PRIMARY'")) {
                    return reject(new BusinessExceptions("SALA COM NUMERO E PAF JÁ EXISTE!", "duplicateRoom", 400));
                }
                return reject(error);
            } else {
                return resolve(idRomm);
            }
        });
    }).finally(() => {
        dbConnection.end();
    })




}


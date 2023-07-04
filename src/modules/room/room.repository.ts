import { ResultSetHeader } from "mysql2";
import MysqlClient from "../../data/mysqlClient";
import { BusinessExceptions } from "../../exceptions/BusinessExceptions";
import { Pagination } from "../../types/Pagination";
import { CreateRoomDto } from "./models/createRoom.dto";
import Room from "./models/room.entity";

export default class RoomRepository {

    protected mysqlClient: MysqlClient;
    constructor() {
        this.mysqlClient = new MysqlClient();
    }

    async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
        const { paf, number } = createRoomDto;
        const sql = `INSERT INTO rooms (paf,number) values (?, ?);`;

        try {
            const { insertId } = await this.mysqlClient.executeSQLQueryParams(sql, [paf, number]) as unknown as ResultSetHeader;
            return {
                code: insertId,
                paf: paf,
                number: number,
            }
        } catch (error: any) {
            if (error.code != null && error.code == "ER_DUP_ENTRY") {
                throw new BusinessExceptions("SALA JÁ EXISTE", "duplicateEntity", 400);
            }

            throw error
        }

    }

    async getAllRooms({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Room[]> {

        const offset = (page - 1) * pageSize;
        const sql = `select * from rooms LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [pageSize, offset]);
        return results as Room[];
    }

    async getRoomsByPaf(data: { roomPaf: string } & Pagination): Promise<Room[]> {
        const { page = 1, pageSize = 25, roomPaf } = data;
        const offset = (page - 1) * pageSize;
        const sql = `select * from rooms where paf = ? LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [roomPaf, pageSize, offset]);
        return results as Room[];
    }

    async getRoomsByNumber(data: { roomNumber: string } & Pagination): Promise<Room[]> {
        const { page = 1, pageSize = 25, roomNumber } = data;
        const offset = (page - 1) * pageSize;
        const sql = `select * from rooms where number = ? LIMIT ? OFFSET ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [roomNumber, pageSize, offset]);
        return results as Room[];
    }

    async getRoomsByCode(roomCode: number): Promise<Room | null> {
        const sql = `select * from rooms where code = ?;`
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [roomCode]);
        return results[0] as Room || null;
    }

    async deleteRoom(roomCode: string): Promise<boolean> {
        const sql = `delete from rooms where code = ?;`;
        const results = await this.mysqlClient.executeSQLQueryParams(sql, [roomCode]) as unknown as ResultSetHeader;
        return results.affectedRows >= 1;
    }
}
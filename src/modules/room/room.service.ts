import { Pagination } from "../../types/Pagination";
import { CreateRoomDto } from "./models/createRoom.dto";
import Room from "./models/room.entity";
import RoomRepository from "./room.repository";

export default class RoomService {
    private roomRepository: RoomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }
    async createRoom(create: CreateRoomDto): Promise<Room> {
        const room = await this.roomRepository.createRoom(create);
        return room;
    }

    async getAllRooms({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Room[]> {
        const rooms = await this.roomRepository.getAllRooms();
        return rooms;
    }

    async getRoomsByPaf(data: { roomPaf: string } & Pagination): Promise<Room[]> {
        const rooms = await this.roomRepository.getRoomsByPaf(data);
        return rooms;
    }

    async getRoomsByNumber(data: { roomNumber: string } & Pagination): Promise<Room[]> {
        const rooms = await this.roomRepository.getRoomsByNumber(data);
        return rooms;
    }

    async getRoomsByCode(code: number): Promise<Room | null> {
        const rooms = await this.roomRepository.getRoomsByCode(code);
        return rooms;

    }

    async deleteRoom(code: string): Promise<boolean> {
        const deletedRoom = await this.roomRepository.deleteRoom(code);
        return deletedRoom;
    }
}
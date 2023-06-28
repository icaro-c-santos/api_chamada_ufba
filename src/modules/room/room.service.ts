import { Pagination } from "../../types/Pagination";
import { CreateRoomDto } from "./models/createRoom.dto";
import Room from "./models/room.entity";
import RoomRepository from "./room.repository";

export default class RoomService{
    private rrepository: RoomRepository; 

    constructor(){
        this.rrepository = new RoomRepository(); 
    }
    async createRoom(create: CreateRoomDto): Promise<Room> {
       const room = await this.rrepository.createRoom(create);
       return room;
    }

    async getAllRooms({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Room[]> {
        const rooms = await this.rrepository.getAllRooms();
        return rooms;
    }

    async getRoomsByPaf(data: { roomPaf: string } & Pagination): Promise<Room[]> {
       const rooms = await this.rrepository.getRoomsByPaf(data); 
       return rooms; 
    }

    async getRoomsByNumber(data: { roomNumber: string } & Pagination): Promise<Room[]> {
        const rooms = await this.rrepository.getRoomsByNumber(data); 
        return rooms; 
    }

    async getRoomsByCode(code: string): Promise<Room | null> {
        const rooms = await this.rrepository.getRoomsByCode(code); 
        return rooms; 
        
    }

    async deleteRoom(code: string): Promise<boolean> {
        const deletedRoom = await this.rrepository.deleteRoom(code); 
        return deletedRoom; 
    }
}
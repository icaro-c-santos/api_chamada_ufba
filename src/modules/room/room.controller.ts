import { validate } from "class-validator";
import { CreateRoomDto } from "./models/createRoom.dto";
import Room from "./models/room.entity";
import RoomService from "./room.service";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";

export default class RoomController {
    private roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }
    async createRoom(req: Request, res: Response): Promise<Room | undefined> {
        const roomData = req.body;

        const room = plainToClass(CreateRoomDto, roomData);

        const errors = await validate(room);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const createRoom = await this.roomService.createRoom(room);

        res.status(200).json({ room: createRoom });

    }

    async getAllRooms(req: Request, res: Response): Promise<void> {
        const rooms = await this.roomService.getAllRooms();
        res.status(200).json({ rooms });
    }

    async getRoomsByPaf(req: Request, res: Response): Promise<Room[] | undefined> {
        const roomPaf = req.body.paf;

        const room = await this.roomService.getRoomsByPaf(roomPaf);

        if (!room) {
            res.status(404).json({ error: "Sala não encontrada" });
            return;
        }

        res.status(200).json({ room });
    }

    async getRoomsByNumber(req: Request, res: Response): Promise<Room[] | undefined> {
        const roomNumber = req.body.number;

        const room = await this.roomService.getRoomsByNumber(roomNumber);

        if (!room) {
            res.status(404).json({ error: "Sala não encontrada" });
            return;
        }

        res.status(200).json({ room });
    }

    async getRoomsByCode(req: Request, res: Response): Promise<Room | undefined> {
        const roomCode = req.body.code;

        const room = await this.roomService.getRoomsByCode(roomCode);

        if (!room) {
            res.status(404).json({ error: "Sala não encontrada" });
            return;
        }

        res.status(200).json({ room });
    }

    async deleteRoom(req: Request, res: Response): Promise<boolean | undefined> {
        const roomCode = req.body.code;

        const deletedRoom = await this.roomService.deleteRoom(roomCode);

        if (!deletedRoom) {
            res.status(404).json({ error: "Sala não encontrada" });
            return;
        }

        res.status(200).json({ message: "Sala excluída com sucesso" });
    }
}
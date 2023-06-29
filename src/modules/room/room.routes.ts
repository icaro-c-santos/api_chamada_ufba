import { Router } from "express";
import RoomController from "./room.controller";



const routerRoom = Router();
const roomController = new RoomController;


routerRoom.post("/", roomController.createRoom.bind(roomController));
routerRoom.get("/:code", roomController.getRoomsByCode.bind(roomController));
routerRoom.get("/:number", roomController.getRoomsByNumber.bind(roomController));
routerRoom.get("/:paf", roomController.getRoomsByPaf.bind(roomController));
routerRoom.get("/", roomController.getAllRooms.bind(roomController));
routerRoom.delete("/:code", roomController.deleteRoom.bind(roomController)); 
export default routerRoom;
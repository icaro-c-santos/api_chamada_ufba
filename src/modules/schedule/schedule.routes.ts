import { Router } from "express";
import ScheduleController from "./schedule.controller";




const routerSchedule = Router();
const scheduleController = new ScheduleController;


routerSchedule.post("/", scheduleController.createSchedule.bind(scheduleController));
routerSchedule.get("/:code", scheduleController.getScheduleByCode.bind(scheduleController));
routerSchedule.get("/:filters", scheduleController.getScheduleByFilters.bind(scheduleController));
routerSchedule.get("/", scheduleController.getAllSchedules.bind(scheduleController));
routerSchedule.delete("/:code", scheduleController.deleteSchedule.bind(scheduleController)); 
export default routerSchedule;
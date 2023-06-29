import { Router } from "express";
import SubjectController from "./subject.controller";


const routerSubject = Router();
const subjectController = new SubjectController;


routerSubject.post("/", subjectController.createSubject.bind(subjectController));
routerSubject.get("/:code", subjectController.getSubjectByCode.bind(subjectController));
routerSubject.get("/:name", subjectController.getSubjectByName.bind(subjectController));
routerSubject.get("/", subjectController.getAllSubjects.bind(subjectController));
routerSubject.delete("/:code", subjectController.deleteRoom.bind(subjectController)); 
export default routerSubject;
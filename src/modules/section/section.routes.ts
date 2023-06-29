import { Router } from "express";
import SectionController from "./section.controller";


const routerSection = Router();
const sectionController = new SectionController;


routerSection.post("/", sectionController.createSection.bind(sectionController));
routerSection.get("/", sectionController.getAllSections.bind(sectionController));
routerSection.get("/:code", sectionController.getProfessorsInSection.bind(sectionController));
routerSection.get("/:code", sectionController.getStudentsInSection.bind(sectionController));
routerSection.post("/professor", sectionController.addProfessorInSection.bind(sectionController));
routerSection.post("/estudante", sectionController.addStudentInSection.bind(sectionController));
routerSection.delete("/professor", sectionController.removeProfessorInSection.bind(sectionController)); 
routerSection.delete("/estudante", sectionController.removeStudentInSection.bind(sectionController)); 
export default routerSection;
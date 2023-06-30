import { Router } from "express";
import SectionController from "./section.controller";


const routerSection = Router();
const sectionController = new SectionController;



routerSection.get("/:code", sectionController.getDataSection.bind(sectionController))
routerSection.get("/:code/professors", sectionController.getProfessorsInSection.bind(sectionController));
routerSection.get("/:code/students", sectionController.getStudentsInSection.bind(sectionController))

routerSection.post("/", sectionController.createSection.bind(sectionController));
;
routerSection.post("/professor", sectionController.addProfessorInSection.bind(sectionController));
routerSection.post("/estudante", sectionController.addStudentInSection.bind(sectionController));
routerSection.delete("/professor", sectionController.removeProfessorInSection.bind(sectionController));
routerSection.delete("/estudante", sectionController.removeStudentInSection.bind(sectionController));
export default routerSection;
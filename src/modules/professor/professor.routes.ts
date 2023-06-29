import { Router } from "express";
import ProfessorController from "./professor.controller";


const routerProfessor = Router();
const professorController = new ProfessorController;


routerProfessor.post("/", professorController.createProfessor.bind(professorController));
routerProfessor.get("/:cpf", professorController.getProfessorByCpf.bind(professorController));
routerProfessor.get("/:code", professorController.getProfessorByCode.bind(professorController));
routerProfessor.get("/:name", professorController.getProfessorByName.bind(professorController));
routerProfessor.get("/", professorController.getAllProfessor.bind(professorController));
routerProfessor.patch("/:cpf", professorController.getAllProfessor.bind(professorController));
routerProfessor.delete("/:cpf", professorController.deleteProfessor.bind(professorController)); 
export default routerProfessor;

import { Router } from "express";
import StudentController from "./student.controller";


const routerStudent = Router();
const studentController = new StudentController;


routerStudent.post("/", studentController.createStudent.bind(studentController));
routerStudent.get("/:cpf", studentController.getStudentByCpf.bind(studentController));
routerStudent.get("/:enrolment", studentController.getStudentByEnrolment.bind(studentController));
routerStudent.get("/:name", studentController.getStudentByName.bind(studentController));
routerStudent.get("/", studentController.getAllStudent.bind(studentController));
routerStudent.patch("/:cpf", studentController.updateStudent.bind(studentController));
routerStudent.delete("/:cpf", studentController.deleteStudent.bind(studentController)); 
export default routerStudent;
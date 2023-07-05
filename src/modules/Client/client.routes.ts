import { Router } from "express";
import ClientController from "./client.controller";
import { auth } from "../../middlewares/auth";





const routerClient = Router();
const clientController = new ClientController();
routerClient.post("/login", clientController.login.bind(clientController));
routerClient.use(auth);

routerClient.get("/professors/sections", clientController.getDataSectionProfessor.bind(clientController))
routerClient.get("/professors/sections/:id", clientController.getDataSection.bind(clientController));
routerClient.get("/professors/sections/:id/presences", clientController.getPresencesOfSection.bind(clientController));

routerClient.get("/students/sections", clientController.getDataSectionStudents.bind(clientController))
routerClient.get("/students/sections/:id", clientController.getDataSectionOfStudent.bind(clientController))
routerClient.get("/students/sections/:id/presences", clientController.getPresencesOfStudent.bind(clientController));
routerClient.put("/students/sections/:id/presences", clientController.updatePresence.bind(clientController));
routerClient.post("/students/sections/:id/presences", clientController.createPresence.bind(clientController));


export default routerClient;



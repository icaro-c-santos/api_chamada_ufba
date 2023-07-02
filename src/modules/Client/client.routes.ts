import { Router } from "express";
import ClientController from "./client.controller";





const routerClient = Router();
const clientController = new ClientController();

routerClient.get("/sections/", clientController.getDataSectionSelfUser.bind(clientController))
routerClient.get("/sections/:id", clientController.getDataSection.bind(clientController));
routerClient.get("/sections/:id/presences", clientController.getPresencesOfSection.bind(clientController));

export default routerClient;



import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import * as dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc/swagger";
import { ErrorMiddleware } from "./middlewares/errorMiddleware ";
import RoomRepository from "./modules/room/room.repository";
import routerProfessor from "./modules/professor/professor.routes";
import routerRoom from "./modules/room/room.routes";
import routerSchedule from "./modules/schedule/schedule.routes";
import routerSection from "./modules/section/section.routes";
import routerStudent from "./modules/student/student.routes";
import routerSubject from "./modules/subject/subject.routes";
import routerClient from "./modules/Client/client.routes";

dotenv.config();
config();
const app = express();
const PORT = process.env.NODE_LOCAL_PORT

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/client", routerClient);
app.use("/professors", routerProfessor);
app.use("/room", routerRoom);
app.use("/schedule", routerSchedule);
app.use("/sections", routerSection);
app.use("student", routerStudent);
app.use("subject", routerSubject);
app.use(ErrorMiddleware);



app.listen(process.env.NODE_LOCAL_PORT, () => {

  console.log(
    `Express started at http://localhost:${PORT}`
  );
});

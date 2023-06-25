import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import * as dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc/swagger";
import { ErrorMiddleware } from "./middlewares/errorMiddleware ";
import StudentRepository from "./modules/student/student.repository";
import RoomRepository from "./modules/room/room.repository";

dotenv.config();
config();
const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


const ds = new RoomRepository();

ds.createRoom({
  paf: "PAFc01",
  number: 12
}).then(console.log);

app.use(ErrorMiddleware);
app.listen(process.env.NODE_LOCAL_PORT, () => {

  console.log(
    `Express started at http://localhost:${process.env.NODE_LOCAL_PORT}`
  );
});

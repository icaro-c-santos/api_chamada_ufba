import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import * as dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc/swagger";
import { ErrorMiddleware } from "./middlewares/errorMiddleware ";
import RoomRepository from "./modules/room/room.repository";

dotenv.config();
config();
const app = express();
const PORT = process.env.NODE_LOCAL_PORT

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(ErrorMiddleware);
app.listen(process.env.NODE_LOCAL_PORT, () => {

  console.log(
    `Express started at http://localhost:${PORT}`
  );
});

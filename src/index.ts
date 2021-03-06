import express from "express";
/* import ip from "ip"; */
import dotenv from "dotenv";
import cors from "cors";
import Resp from "./domain/response";
import logger from "./util/logger"
import HttpStatus from "./controller/patient.controller"

dotenv.config();
const PORT = process.env.SERVERPORT || 3000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_req, res) => res.send(new Resp(HttpStatus.OK.code, HttpStatus.OK.status, "Pacient API, v1.0.0 - All Systems Go",)));



app.listen(PORT, () => {
  logger.info(`Server running on: ${PORT}`); /* ${ip.address() */
});

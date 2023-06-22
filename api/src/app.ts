import express from "express";
import morgan from "morgan";
import router from "./routes/routes";

//? midleware
/* import cors from "./Middleware/cors"; //Manual */
import log from "./Middleware/log";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server;
// Este lo creo adha
server.use(log);

server.use("/", router);

export default server;

import express from "express";
import morgan from "morgan";
import router from "./routes/routes";

//? midleware
import cors from "./Middleware/cors";
import log from "./Middleware/log";
import session from "./Middleware/session";

const server = express();

server.use(express.json());
server.use(morgan("dev"));

// ESTE MIDLEWALRE ES UN CORS MANUAL (TAMBIEN EXISTE UNA LIBRERIA LLAMADA CORS)
server.use(cors);
// Este lo creo adha
server.use(log);
//Seccion
server.use(session);

server.use("/", router);

export default server;

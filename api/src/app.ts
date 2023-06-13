import express, {NextFunction, Request, Response} from "express";
const morgan = require("morgan");
import { router } from "./routes/routes";
const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use((_req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*'); // Establecemos el encabezado 'Access-Control-Allow-Origin' para permitir solicitudes desde un dominio específico (actualízalo según tu configuración)
    res.header('Access-Control-Allow-Credentials', 'true');// Establecemos el encabezado 'Access-Control-Allow-Credentials' para permitir el envío de cookies en las solicitudes
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');// Establecemos los encabezados permitidos en las solicitudes
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');// Establecemos los métodos HTTP permitidos en las solicitudes
    next();
  });

  server.use("/", router);

  server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
 
  export default server;
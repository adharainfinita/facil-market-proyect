import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import router from "./routes/routes";

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use((_req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});



server.use("/", router);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;
	const message = err.message || "Internal Server Error";
	console.error(err);
	res.status(status).send(message);
});


export default server;

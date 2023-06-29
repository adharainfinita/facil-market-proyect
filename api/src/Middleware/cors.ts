import { NextFunction, Request, Response } from "express";

const cors = (_req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "https://facil-market-proyect-pec6bj9vi-adharainfinita.vercel.app/");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
};

export default cors;

import { NextFunction, Request, Response } from "express";

const log = (err: any, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;
	const message = err.message || "Internal Server Error";
	console.error(err);
	res.status(status).send(message);
	next();
};
export default log;

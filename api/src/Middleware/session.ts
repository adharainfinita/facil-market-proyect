import { NextFunction, Request, Response } from "express";

const session = (req: Request, res: Response, next: NextFunction) => {
	next();
};

export default session;

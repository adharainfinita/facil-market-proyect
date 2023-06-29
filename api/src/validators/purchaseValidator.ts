import { Request, Response, NextFunction } from "express";
import { check, body } from "express-validator";
import { validateResult } from "../helpers/validationResult";

export const purchaseCreate = [
	body(),

	check("userId").isInt().withMessage("El UserId debe ser números y enteros."),

	check("productId")
		.isInt()
		.withMessage("El ProductId debe ser números y enteros."),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
import { Request, Response, NextFunction } from "express";
import { check, body } from "express-validator";
import { validateResult } from "../helpers/validationResult";

export const purchaseCreate = [
	body(),

	check("userId").isInt().withMessage("El UserId debe ser números y enteros."),

	check("paymentId")
		.isInt()
		.withMessage("El paymentId debe ser números y enteros."),

	check("products").isArray().withMessage("El products debe ser un array"),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

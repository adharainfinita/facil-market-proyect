import { Request, Response, NextFunction } from "express";
import { check, body } from "express-validator";
import { validateResult } from "../helpers/validationResult";

export const reviewCreate = [
	body(),

	check("id").not().exists(),

	check("text")
		.not()
		.isNumeric()
		.customSanitizer((value, { req }) => {
			return value.charAt(0).toLocaleUpperCase() + value.slice(1);
		})
		.isLength({
			min: 2,
			max: 2000,
		})
		.withMessage("La reseña no puede superar los 2000 caracteres"),

	check("userID").isInt().withMessage("Las FK deben ser números y enteros"),

	check("productID").isInt().withMessage("Las FK deben ser números y enteros"),

	check("rating")
		.isFloat({
			min: 0.0,
			max: 5.0,
		})
		.withMessage("La puntuación debe ser entre 0 y 5.0"),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

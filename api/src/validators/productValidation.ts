import { Request, Response, NextFunction } from "express";
import { check, body } from "express-validator";
import { validateResult } from "../helpers/validationResult";

export const productCreate = [
	body(),

	check("id").not().exists(),

	check("name")
		.isString()
		.isLength({
			max: 150,
		})
		.customSanitizer((value, { req }) => {
			return value.charAt(0).toLocaleUpperCase() + value.slice(1);
		}),

	check("description")
		.isString()
		.isLength({
			min: 10,
			max: 5000,
		})
		.withMessage("Has excedido el número de caracteres"),

	check("stock").isInt().withMessage("El stock debe ser un número entero"),

	check("rating")
		.isFloat({
			min: 0.0,
			max: 5.0,
		})
		.withMessage("La puntuación debe ser entre 0 y 5.0"),

	check("price").isNumeric().isDecimal(),

	check("categoryID").isInt().withMessage("Las FK deben ser números y enteros"),

	check("userID").isInt().withMessage("Las FK deben ser números y enteros"),
	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

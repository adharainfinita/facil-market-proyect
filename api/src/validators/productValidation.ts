import { Request, Response, NextFunction } from "express";
import { check, body } from "express-validator";
import { validateResult } from "../helpers/validationResult";

export const productCreate = [
	body(),

	check("id").not().exists(),

	check("name")
		.isString()
		.isLength({
			min: 3,
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
		.withMessage("La descripción debe tener entre 10 y 500 caracteres"),

	check("stock").isInt().withMessage("Stock debe ser un número entero"),

	check("rating")
		.isFloat({
			min: 0.0,
			max: 5.0,
		})
		.withMessage("La calificación debe estar entre 0 y 5.0"),

	check("price").isNumeric().isDecimal(),

	check("categoryID")
		.isInt()
		.withMessage("El ID de Categoria debe ser números y enteros."),

	check("userID")
		.isInt()
		.withMessage("El ID de usuario debe ser números y enteros."),
	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

import { Request, Response, NextFunction } from "express";
import { check, body } from "express-validator";
import { validateResult } from "../helpers/validationResult";

const categoryCreate = [
	body(),

	check("id").not().exists(),

	check("name")
		.exists()
		.notEmpty()
		.isString()
		.isLength({
			min: 4,
			max: 25,
		})
		.withMessage(
			"La categoría debe ser una cadena y debe tener entre 4 y 25 caracteres"
		)
		.customSanitizer((value, { req }) => {
			return value.charAt(0).toLocaleUpperCase() + value.slice(1);
		}),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export default categoryCreate;

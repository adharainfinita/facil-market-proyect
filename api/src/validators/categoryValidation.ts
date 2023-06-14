import { Request, Response, NextFunction } from "express";
import { check, body } from "express-validator";
import { validateResult } from "../helpers/validationResult";

const categoryCreate = [
<<<<<<< HEAD
	body()
		.exists()
		.notEmpty()
		.withMessage("El campo de la solicitud está vacío MASTER"),
=======
	body(),
>>>>>>> dbdf6f37b048f1fe4b2a137d14a807dc6fa3d6a2

	check("id").not().exists(),

	check("name")
		.exists()
		.notEmpty()
		.isString()
		.isLength({
			min: 2,
			max: 100,
		})
		.withMessage(
			"La categoría debe ser un string y no debe superar los 100 caracteres"
		)
		.customSanitizer((value, { req }) => {
			return value.charAt(0).toLocaleUpperCase() + value.slice(1);
		}),

	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];

export default categoryCreate;

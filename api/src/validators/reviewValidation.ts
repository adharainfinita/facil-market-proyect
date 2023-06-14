import { Request, Response, NextFunction } from "express";
import { check, body } from "express-validator";
import { validateResult } from "../helpers/validationResult";

export const reviewCreate = [
<<<<<<< HEAD
	body()
		.exists()
		.isEmpty()
		.withMessage("El campo de la solicitud está vacío MASTER"),

	check("id").not().exists(),

	check("name")
		.customSanitizer((value, { req }) => {
			return value.charAt(0).toLocaleUpperCase() + value.slice(1);
		})
		.isString()
		.custom((value, { req }) => {
			if (/\d/.test(value)) {
				// Verificar si contiene números utilizando una expresión regular
				throw new Error("Tu nombre no puede contener números");
			}
			if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
				throw new Error("No se permiten caracteres especiales");
			}
			return true;
		})
		.withMessage("Tu nombre solo puede contener letras"),

	check("lastName")
		.isString()
		.custom((value, { req }) => {
			if (/\d/.test(value)) {
				// Verificar si contiene números utilizando una expresión regular
				throw new Error("Tu apellido no puede contener números");
			}
			if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
				throw new Error("No se permiten caracteres especiales");
			}
			return true;
		})
		.customSanitizer((value, { req }) => {
			return value.charAt(0).toLocaleUpperCase() + value.slice(1);
		}),

	check("email").isEmail(),

	check("password")
		.isStrongPassword({
			minLength: 7,
			minNumbers: 1,
			minLowercase: 5,
			minUppercase: 0,
			minSymbols: 0,
			returnScore: true,
			pointsPerUnique: 4,
			pointsPerRepeat: 1,
			pointsForContainingLower: 5,
			pointsForContainingUpper: 3,
			pointsForContainingNumber: 8,
			pointsForContainingSymbol: 5,
		})
		.custom((value, { req }) => {
			if (value.length < 7) {
				throw new Error("La contraseña es muy corta");
			}
			if (
				!value.includes(
					Number(
						"1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0"
					)
				)
			) {
				throw new Error("Se necesita un número");
			}
			return true;
		}),
	(req: Request, res: Response, next: NextFunction) => {
		validateResult(req, res, next);
	},
];
=======
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
>>>>>>> dbdf6f37b048f1fe4b2a137d14a807dc6fa3d6a2

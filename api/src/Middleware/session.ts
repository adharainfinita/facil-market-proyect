import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtHandle";

const checkSession = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return res
				.status(401)
				.json({ error: "No se proporcionó un token de autenticación" });
		}

		const token = authorizationHeader.split(" ")[1];
		if (!token) {
			return res
				.status(401)
				.json({ error: "El token de autenticación es inválido" });
		}

		try {
			const isValidToken = verifyToken(token);
			if (!isValidToken) {
				return res.status(401).json({
					error: "El token de autenticación es inválido o ha expirado",
				});
			}
		} catch (error) {
			return res
				.status(401)
				.json({ error: "El token de autenticación es inválido o ha expirado" });
		}

		next();
	} catch (error: any) {
		return res.status(500).json({
			error: "Se produjo un error al verificar el token de autenticación",
		});
	}
};

export default checkSession;

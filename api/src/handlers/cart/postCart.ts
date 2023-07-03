import { Request, Response } from "express";
import { createCart } from "../../controllers/cart.controllers";

export const addItem = async (req: Request, res: Response) => {
	try {
		// Obtener los datos de la solicitud
		const { userID } = req.params;
		const products: Array<number> = req.body;

		// Crear el carrito de compras
		const response = await createCart(Number(userID), products);

		// Enviar respuesta de éxito
		res.status(201).json(response);
	} catch (error) {
		// Manejar errores
		res.status(500).json(error);
	}
};

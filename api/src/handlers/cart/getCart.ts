import { Request, Response } from "express";
import { getCartById } from "../../controllers/cart.controllers";

// Ruta: GET /cart
export const getAllItems = async (req: Request, res: Response) => {
	const { userID } = req.params;

	try {
		const cartItems = await getCartById(Number(userID));
		return res.status(200).json(cartItems);
	} catch (error: any) {
		error.message.includes("usuario")
			? res.status(404).json(error.message)
			: res.status(500).send(error.message);
	}
};

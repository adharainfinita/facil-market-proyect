import { Request, Response } from "express";
import { changeItemsCart } from "../../controllers/cart.controllers";

export const updateItem = async (req: Request, res: Response) => {
	try {
		const { userID } = req.params;
		const productID = req.body;

		const cartItem = await changeItemsCart(Number(userID), productID);

		res.status(200).json(cartItem);
	} catch (error) {
		res.status(500).json(error);
	}
};

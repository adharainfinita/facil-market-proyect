import { Request, Response } from "express";
import { changeItemsCart } from "../../controllers/cart.controllers";

export const updateItem = async (req: Request, res: Response) => {
	try {
		const { userID } = req.params;
		const productID  = req.body;

		console.log(productID);
		

		const cartItem = await changeItemsCart(Number(userID), productID);
		console.log(cartItem);
		
		res.status(200).json(cartItem);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

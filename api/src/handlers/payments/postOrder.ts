import { Request, Response } from "express";
import { createOrder } from "../../controllers/payment.controllers";

const postOrder = async (req: Request, res: Response) => {
	const products = req.body;

	const response = await createOrder(products);
	
	return res.status(200).send(response.body);
};

export default postOrder;

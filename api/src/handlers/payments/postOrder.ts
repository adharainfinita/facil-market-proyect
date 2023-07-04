import { Request, Response } from "express";
import { createOrder } from "../../controllers/payment.controllers";
//import { BuyProduct, PaymentProductsProps } from "../../interfaces/propsModel";

const postOrder = async (req: Request, res: Response) => {
	const {userID} = req.params;
	const products = req.body;

	if (products) {
		const productsArray: any = Object.values(products);
		const response = await createOrder(productsArray, Number(userID));
		return res.status(200).send(response.body);
	}
};

export default postOrder;

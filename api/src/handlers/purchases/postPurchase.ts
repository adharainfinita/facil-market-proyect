import { Request, Response } from "express";
import { purchases } from "../../interfaces/propsModel";
import { createPurchase } from "../../controllers/purchaseController";

const postPurchase = async (req: Request, res: Response) => {
	try {
		const { userId, productId } = req.body;

        const data: purchases = {userId, productId}
		const newPurchase = await createPurchase(data);

		return res
			.status(201)
			.json({ message: "Compra creada correctamente", newPurchase });
	} catch (error: any) {
		return error.message.includes("Not Found")
			? res.status(404).json({ error: error.message })
			: res.status(500).json({ error: error.message });
	}
};

export default postPurchase;
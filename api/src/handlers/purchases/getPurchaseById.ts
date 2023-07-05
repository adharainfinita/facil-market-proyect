import { Request, Response } from "express";
import { getPurchaseById } from "../../controllers/purchaseController";

const getPurchase = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const purchase = await getPurchaseById(Number(id));

		return res.status(201).json(purchase);
	} catch (error: any) {
		return error.message.includes("Not Found")
			? res.status(404).json({ error: error.message })
			: res.status(500).json({ error: error.message });
	}
};

export default getPurchase;
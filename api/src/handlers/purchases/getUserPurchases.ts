import { Request, Response } from "express";
import { getPurchaseByUser } from "../../controllers/purchaseController";

const getUserPurchases = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const Userpurchases = await getPurchaseByUser(Number(userId));

		return res.status(201).json(Userpurchases);
	} catch (error: any) {
		return error.message.includes("Not Found")
			? res.status(404).json({ error: error.message })
			: res.status(500).json({ error: error.message });
	}
};

export default getUserPurchases;

import { Request, Response } from "express";
import { getPurchaseByUser } from "../../controllers/purchaseController";

const getUserPurchases = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const Userpurchases = await getPurchaseByUser(Number(id));
		console.log(id);
		
		console.log("purchases:", Userpurchases);
		

		return res.status(201).json(Userpurchases);
	} catch (error: any) {
		return error.message.includes("Not Found")
			? res.status(404).json({ error: error.message })
			: res.status(500).json({ error: error.message });
	}
};

export default getUserPurchases;

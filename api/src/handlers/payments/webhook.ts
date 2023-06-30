import { Request, Response } from "express";
import { createNotification, createNewPayment } from "../../controllers/payment.controllers";

const receivedWebhook = async (req: Request, res: Response) => {
	const payment = req.query;

	try {
		if (payment.type === "payment") {
			const id = Number(payment["data.id"]);
			const data = await createNotification(id);

			console.log(data);
			if(data.status === 'approved'){
				const response = await createNewPayment(data);
				return res.status(201).json(response);
			}
		}
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
export default receivedWebhook;

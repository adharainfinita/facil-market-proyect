import { Request, Response } from "express";
import {
	createNotification,
	createNewPayment,
} from "../../controllers/payment.controllers";
import { sendPurchaseNotification } from "../../controllers/payment.controllers";

const receivedWebhook = async (req: Request, res: Response) => {
	const payment = req.query;

	try {
		if (payment.type === "payment") {
			const id = Number(payment["data.id"]);
			const data = await createNotification(id);

			if (data.status === "approved") {
				const response = await createNewPayment(data);
				sendPurchaseNotification(response);

				return res.status(201).json(response);
			}
		}
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};
export default receivedWebhook;

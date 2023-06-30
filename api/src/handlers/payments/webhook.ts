import { Request, Response } from "express";
import { createNotification } from "../../controllers/payment.controllers";
import { createdNewPayment } from "../../controllers/payment.controllers";

const receivedWebhook = async (req: Request, res: Response) => {
	const payment = req.query;

	try {
		if (payment.type === "payment") {
			const id = Number(payment["data.id"]);
			const data = await createNotification(id);

			console.log(data);

			const response = await createdNewPayment(data);
			return res.send(response);
		}

		// if(payment.topic === 'merchant_order'){
		// 	const id = Number(payment['id']);
		// 	const dataMerchant = await createNotification(id);
		// 	console.log(dataMerchant);

		// }
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
export default receivedWebhook;

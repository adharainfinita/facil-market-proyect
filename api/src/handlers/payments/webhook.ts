import { Request, Response } from "express";
import {
	createNotification,
	createNewPayment,
} from "../../controllers/payment.controllers";
import { sendPurchaseNotification } from "../../controllers/payment.controllers";
// import { paymentProps } from "../../interfaces/propsModel";

const receivedWebhook = async (req: Request, res: Response) => {
	const payment = req.query;

	try {
		if (payment.type === "payment") {
			const id = Number(payment["data.id"]);
			const data = await createNotification(id);

			console.log(data);
			if (data.status === "approved") {
				const response = await createNewPayment(data);

				// const contentForMail: paymentProps = {
				// 	order: response.order,
				// 	sellerID: response.sellerID,
				// 	buyerID: response.buyerID,
				// 	grossAmount: response.grossAmount,
				// 	netAmount: response.netAmount,
				// 	limitDate: response.limitDate,
				// 	resume: response.resume
				// }
				sendPurchaseNotification(response);

				return res.status(201).json(response);
			}
		}
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
export default receivedWebhook;
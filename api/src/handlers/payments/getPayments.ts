import { Request, Response } from "express";
import { getPaymentsFromDB } from "../../controllers/payment.controllers";

const getPayments = async (req: Request, res: Response) => {
	try {
		const response = await getPaymentsFromDB();
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json(error);
	}
};
export default getPayments;

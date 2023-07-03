import { Request, Response } from "express";
import { createDataAnalitycs } from "../../controllers/admin.controllers";

const getData = async (req: Request, res: Response) => {
	try {
		const response = await createDataAnalitycs();
		return res.status(200).json(response);
	} catch (error: any) {
		return res.status(404).json(error.message);
	}
};

export default getData;

import { Request, Response } from "express";
import { createResumeData } from "../../controllers/admin.controllers";

const getBasicData = async (req: Request, res: Response) => {
	try {
		const response = await createResumeData();
		return res.status(200).json(response);
	} catch (error: any) {
		return res.status(404).json(error.message);
	}
};

export default getBasicData;

import { Request, Response } from "express";
import { findAllCategories } from "../../controllers/categoryControllers";

const getAllCategories = async (req: Request, res: Response) => {
	try {
		const allCategories = await findAllCategories();

		if (!allCategories) throw new Error("No hay categorías creadas");

		return res.status(200).json(allCategories);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default getAllCategories;

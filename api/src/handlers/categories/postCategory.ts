import { Request, Response } from "express";
import { createCategory } from "../../controllers/categoryControllers";

const postCategory = async (req: Request, res: Response) => {
	try {
		const { name, image, highlight } = req.body;

		const newCategory = await createCategory({ name, image, highlight });

		return res.status(201).json(newCategory);
	} catch (error: any) {
		return res.status(400).json({ message: error.message });
	}
};

export default postCategory;

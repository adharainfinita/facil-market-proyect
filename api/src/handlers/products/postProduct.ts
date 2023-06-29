import { Request, Response } from "express";
import { createProduct } from "../../controllers/productControllers";

const postProduct = async (req: Request, res: Response) => {
	try {
		const {
			userID,
			categoryID,
			name,
			description,
			status,
			unities,
			stock,
			rating,
			images,
			location,
			price,
			active,
		} = req.body;

		const data = {
			name,
			description,
			status,
			unities,
			stock,
			rating,
			images,
			location,
			price,
			userID,
			categoryID,
			active,
		};
		console.log(typeof data.status);

		const newProduct = await createProduct(data);
		return res.status(201).json(newProduct);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default postProduct;

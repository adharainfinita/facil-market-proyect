import { Request, Response } from "express";
import { findAllProducts } from "../../controllers/productControllers";

const getAllProducts = async (req: Request, res: Response) => {
	try {
		const allProducts = await findAllProducts();

		if (!allProducts) throw new Error("No available products found");
		return res.status(200).json(allProducts);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default getAllProducts;

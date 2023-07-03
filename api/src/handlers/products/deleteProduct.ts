import { Request, Response } from "express";
import { deleteProductProperties } from "../../controllers/productControllers";

const deleteProduct = async (req: Request, res: Response) => {
	const productId = Number(req.params.id);
	const { active } = req.body;

	try {
		const response = await deleteProductProperties(active, productId);

		if (response) {
			return res.status(200).json(response);
		} else {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
	} catch (error: any) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteProduct;

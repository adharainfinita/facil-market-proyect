import { Request, Response } from "express";
import { changeProductProperties } from "../../controllers/productControllers";

const updateProduct = async (req: Request, res: Response) => {
	const product = req.body;

	const productId = Number(req.params.id);

	try {
		const response = await changeProductProperties(product, productId);

		if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
	} catch (error: any) {
		return res.status(400).json({ error: error.message });
	}
};

export default updateProduct;

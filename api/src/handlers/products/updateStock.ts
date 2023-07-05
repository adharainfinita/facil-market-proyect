import { Request, Response } from "express";
import { updateStock } from "../../controllers/productControllers";

const updateProductStock = async (req: Request, res: Response) => {
	const { unities } = req.body;
	const { id } = req.params;

	try {
		const response = await updateStock(Number(id), unities);
		if (response) {
			return res.status(200).json("Stock actualizado");
		} else {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
	} catch (error: any) {
		return res.status(400).json({ error: error.message });
	}
};

export default updateProductStock;

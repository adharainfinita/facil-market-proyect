import { Request, Response } from "express";
import { findProductByName } from "../../controllers/productControllers";

const getProductByName = async (req: Request, res: Response) => {
	try {
		const { name } = req.query;
		
		//? obtener todos los productos de la db
		const responseDB = await findProductByName(String(name));

		return res.status(200).json(responseDB);
	} catch (error: any) {
		return res.status(404).json({ error: error.message });
	}
};

export default getProductByName;

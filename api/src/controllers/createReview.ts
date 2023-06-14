import { Request, Response } from "express";
import Review from "../models/Review";
import User from "../models/User";
import Product from "../models/Product";

const createReview = async (req: Request, res: Response) => {
	try {
		const { userID, productID, text, rating } = req.body;

		// Verificar si el usuario y el producto existen en la base de datos
		const userExists = await User.findByPk(userID);
		const productExists = await Product.findByPk(productID);

		if (!userExists || !productExists) {
			throw new Error("El usuario o el producto no existen");
		}

		// Crear el nuevo review
		const review = await Review.create({
			userID,
			productID,
			text,
			rating,
		});

		return res
			.status(201)
			.json({ message: "Review creado exitosamente", review });
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default createReview;

import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import User from "../models/User";

const createProduct = async (req: Request, res: Response) => {
	try {
		//? Verificar si el usuario está registrado
		const { userId } = req.body;

		const user = await User.findByPk(userId);
		if (!user) {
			throw new Error("Usuario no encontrado");
		}

		//? Verificar si la categoría existe y obtener su nombre
		const { categoryId } = req.body;

		if (!categoryId) {
			throw new Error("Categoría no encontrada");
		}

		const category = await Category.findByPk(categoryId);

		const { name, description, stock, rating, image, location, price } =
			req.body;

		//? Crear el producto
		const product = await Product.create({
			name,
			description,
			stock,
			rating,
			image,
			location,
			price,
			userID: userId,
			categoryID: category?.id,
			nameCategory: category?.name,
		});

		return res.status(201).json(product);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default createProduct;

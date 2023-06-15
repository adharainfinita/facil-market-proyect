import Product from "../models/Product";
import { findCategoryByID } from "./categoryControllers";
import { findUser } from "./userControllers";
import { Op } from "sequelize";

interface localProps {
	name: string;
	description: string;
	location: string;
	stock: number;
	rating: number;
	image: string;
	price: number;
	userID: number;
	categoryID: number;
}

export const createProduct = async ({
	name,
	description,
	location,
	stock,
	rating,
	image,
	price,
	userID,
	categoryID,
}: localProps) => {
	//? Verificar si el usuario está registrado
	let param = userID;
	const userFound = await findUser({ param });
	if (!userFound) {
		throw new Error("User not found");
	}

	//? Verificar si la categoría existe y obtener su nombre

	let id = categoryID;
	const categoryFound = await findCategoryByID({ id });
	if (!categoryFound) {
		throw new Error("Category not found");
	}

	//? Crear el producto
	return await Product.create({
		name,
		description,
		stock,
		rating,
		image,
		location,
		price,
		userID: userFound.id,
		userName: userFound?.name,
		categoryID: categoryFound?.id,
		categoryName: categoryFound?.name,
	});
};

export const findAllProducts = async () => await Product.findAll();

//? Buscar productos por nombre
export const findProductByName = async (name: string) => {
	const responseDB = await Product.findAll({
		where: { name: { [Op.iLike]: `%${name}%` } },
	});

	if (!name) {
		throw new Error(`Name was expected`);
	}

	if (!Object.keys(responseDB).length) {
		throw new Error(`No results found for: ${name}`);
	}

	return responseDB;
};

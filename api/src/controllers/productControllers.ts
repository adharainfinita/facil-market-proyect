import Product from "../models/Product";
import { findCategoryByID } from "./categoryControllers";
import { Op } from "sequelize";

interface localProps {
	name: string;
	description: string;
	location: string;
	stock: number;
	rating: number;
	image: string;
	price: number;
	userID: string;
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
		userID,
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

///// search id /////
export const findProductById = async (id: number) => {
	if (!id) {
		throw new Error("The id cannot be a string");
	}

	const product = await Product.findByPk(id);

	if (!product) {
		throw new Error("product not found");
	}

	return product;
};

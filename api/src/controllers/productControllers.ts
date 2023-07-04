import Product from "../models/Product";
import User from "../models/User";
import { findCategoryByID } from "./categoryControllers";
import { Op } from "sequelize";

interface localProps {
	name: string;
	description: string;
	location: string;
	stock: string;
	unities: number;
	status: string;
	rating: number;
	images: string[];
	price: number;
	userID: number;
	categoryID: number;
	active: boolean;
}

export const createProduct = async ({
	name,
	description,
	location,
	stock,
	status,
	unities,
	rating,
	images,
	price,
	userID,
	categoryID,
	active,
}: localProps) => {
	//? Verificar si el usuario está registrado
	let param = userID;
	const userFound = await User.findOne({ where: { id: param } });
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
		images,
		location,
		status,
		unities,
		price,
		userID: userFound.id,
		userName: userFound?.fullName,
		categoryID: categoryFound?.id,
		categoryName: categoryFound?.name,
		active,
	});
};

export const findAllProducts = async () => await Product.findAll();

//? Buscar productos por nombre
export const findProductByName = async (name: string) => {
	const responseDB = await Product.findAll({
		where: { name: { [Op.iLike]: `%${name}%` } },
	});

	if (!name) {
		throw new Error(`No se proporcionó un nombre`);
	}

	if (!Object.keys(responseDB).length) {
		throw new Error(`No hay resultados para: ${name}`);
	}

	return responseDB;
};

//? buscar productos por name
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

//? Actualizar un producto
export const changeProductProperties = async (
	product: localProps,
	id: number
) => {
	const productFound = await Product.findByPk(id);

	await productFound?.update(product);
	return productFound;
};

export const updateStock = async (id: number, unities: number) => {
	const productFound = await Product.findByPk(id);

	if (productFound && unities) {
		const updatedUnits = productFound.unities - unities;
		await productFound.update({ unities: updatedUnits });
	}

	return productFound;
};

//? Delete product
export const deleteProductProperties = async (productID: number) => {
	const product = await Product.findByPk(productID);

	if (!product) {
		throw new Error("No se encontro el producto.");
	}

	product.active = !product.active;

  await product.save();

	return { message: `Estado del producto: ${product.active}`, prod: product };
};


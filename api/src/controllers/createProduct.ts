import Product from "../models/Product";
// import { productProps } from "../utils/propsModel";
import findUser from "./findUser";
import findCategory from "./findCategory"

interface localProps {
	name: string,
	description: string,
	location: string,
	stock: number;
	rating: number;
	image: string;
	price: number;
	userID: number;
	categoryID: number
}

const createProduct = async ({name, description,location, stock, rating, image, price, userID, categoryID}: localProps) => {
	
		//? Verificar si el usuario está registrado
		let id = userID
		const userFound = await findUser({id});
		if (!userFound) {
			throw new Error("User not found");
		}

		//? Verificar si la categoría existe y obtener su nombre
	
		id = categoryID
		const categoryFound = await findCategory({id});
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

export default createProduct;

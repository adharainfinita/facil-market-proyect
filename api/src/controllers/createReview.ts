import { reviewProps } from "../utils/propsModel";
import Review from "../models/Review";
import User from "../models/User";
import Product from "../models/Product";



const createReview = async ({userID, productID, text, rating}: reviewProps) => {

	// Verificar si el usuario y el producto existen en la base de datos
		const userExists = await User.findByPk(userID);
		const productExists = await Product.findByPk(productID);

		if (!userExists || !productExists) {
			throw new Error("User or product not found, please check it they status");
		}
// Crear el nuevo review
		return await Review.create({
			userID,
			productID,
			text,
			rating,
		});
};

export default createReview;

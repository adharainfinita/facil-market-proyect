import { reviewProps } from "../interfaces/propsModel";
import Review from "../models/Review";
import User from "../models/User";
import Product from "../models/Product";

export const createReview = async ({
	userID,
	fullName,
	productID,
	text,
	rating,
}: reviewProps) => {
	//? Verificar si el usuario y el producto existen en la base de datos
	const userExists = await User.findByPk(userID);
	const productExists = await Product.findByPk(productID);

	if (!userExists || !productExists) {
		throw new Error("User or product not found, please check if they exist");
	}
	//? Crear el nuevo review
	return await Review.create({
		userID,
		fullName,
		productID,
		text,
		rating,
	});
};

export const findAllReviews = async () => await Review.findAll();

export const findAllReviewsByProductId = async (productID: number) => {
	return await Review.findAll({
		where: {
			productID: productID,
		},
	});
};

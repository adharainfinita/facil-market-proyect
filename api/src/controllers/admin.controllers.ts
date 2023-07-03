import Product from "../models/Product";
import User from "../models/User";
import Payments from "../models/Payments";
import { formatTime } from "../helpers/formatTime";
import Category from "../models/Category";
import Review from "../models/Review";

export const createDataAnalitycs = async () => {
	const productsInfo = (await Product.findAll()).map((product) => {
		return {
			id: product.id,
			createdAt: formatTime(String(product.createdAt)),
			category: product.categoryID,
			rating: product.rating,
		};
	});

	const allUsers = await Promise.all(
		(
			await User.findAll()
		).map(async (user) => {
			return {
				id: user.id,
				createdAt: formatTime(String(user.createdAt)),
				LevelOfActivity: await getLevelOfActivity(user.id),
			};
		})
	);

	const newStateData = {
		productsInfo,
		allUsers,
	};

	return newStateData;
};

export const createResumeData = async () => {
	const countProduct = await Product.count();
	const countUser = await User.count();
	const countPayment = await Payments.count();

	const generalInfo = {
		totalProducts: countProduct,
		totalUsers: countUser,
		totalSales: countPayment,
		ProductsOnAccesories: await getProductsByCategories(),
	};

	return generalInfo;
};

export const getProductsByCategories = async (
	count: number = 0,
	matches: object = {}
): Promise<object> => {
	const categories = await Category.findAll();
	const categoriesID = categories.map((match) => match.id);

	if (count === categoriesID.length) {
		return matches;
	}

	const value = await Product.count({
		where: {
			categoryID: categoriesID[count],
		},
	});

	const updateMatches = {
		...matches,
		[`${categories[count].name}`]: value,
	};
	return getProductsByCategories(count + 1, updateMatches);
};

export const getLevelOfActivity = async (user: number) => {
	const reviewsFound = await Review.findAll({
		where: {
			userID: user,
		},
	});

	const publicationsFound = await Product.findAll({
		where: {
			userID: user,
		},
	});

	const salesFound = await Payments.findAll({
		where: {
			sellerID: user,
		},
	});

	const paymentsFound = await Payments.findAll({
		where: {
			buyerID: user,
		},
	});

	return (
		reviewsFound.length +
		publicationsFound.length +
		salesFound.length +
		paymentsFound.length
	);
};

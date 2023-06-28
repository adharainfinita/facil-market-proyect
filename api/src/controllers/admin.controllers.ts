import Product from "../models/Product";
import User from "../models/User";
import Payments from "../models/Payments";
import { formatTime } from "../helpers/formatTime";
import Category from "../models/Category";

export const createDataAnalitycs = async () => {
	const allProducts = (await Product.findAll()).map((product) => {
		return formatTime(String(product.createdAt));
	});

	const allUsers = (await User.findAll()).map((user) => {
		return formatTime(String(user.createdAt));
	});

	const newStateData = {
		userInfo: {
			productsDate: allProducts,
			usersDate: allUsers,
		},
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

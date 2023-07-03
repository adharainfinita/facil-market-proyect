import { cartProductProps } from "../interfaces/propsModel";
import Cart from "../models/Cart";
import Product from "../models/Product";

export const createCart = async (userID: number, products: Array<number>) => {
	console.log(userID);
	console.log(products);

	const response = await Cart.create({
		userID: userID,
		productID: products,
	});

	return response;
};

export const getCartById = async (userID: number) => {
	
	
	const myCart = await Cart.findOne({
		where: {
			userID: userID,
		},
	});

	console.log(myCart);

	if (!myCart) throw Error("No existe el usuario");

	const productsCart: cartProductProps = {
		id: myCart!.id,
		userID: myCart!.userID,
		productID: [],
	};
	
	let count = 0;
	while (myCart?.productID!.length !== count) {
		const productFound = await Product.findByPk(myCart?.productID![count]);
		if (productFound) {
			productsCart.productID.push({
				id: productFound.id,
				name: productFound.name,
				price: productFound.price,
				categoryID: productFound.categoryID,
				image: productFound.images[0],
				quantity: 0,
			});
			count++;
		} else
			throw Error(`No existe producto con ID: ${myCart?.productID![count]}`);
	}

	return productsCart;
};

export const changeItemsCart = async (id: number, products: Array<number>) => {
	const myCart = await Cart.findByPk(id);

	myCart?.update(products);

	return myCart;
};

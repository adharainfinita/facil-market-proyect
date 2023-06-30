import { productProps } from "../interfaces/propsModel";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import Payments from "../models/Payments";
import User from "../models/User";
import Product from "../models/Product";
dotenv.config();
const { TOKEN, URL_NGROK } = process.env;

export const createOrder = async (product: productProps) => {
	//Necesito que además del producto, me envíen el id del usuario logueado que está
	// ejecutando la compra
	// lo busco en  la db y lleno los campos de payer
	mercadopago.configure({
		access_token: TOKEN!,
	});

	//Si quiero crear una orden de compras de muchos productos, debería hacer un map del product
	const result = await mercadopago.preferences.create({
		items: [
			{
				id: String(product.id),
				title: product.name,
				unit_price: product.price,
				category_id: String(product.categoryID),
				currency_id: "ARS",
				picture_url: product.image,
				quantity: product.unities,
			},
		],
		payer:{
			name: "sushi33@gmail.com",
			email: "sushi33@gmail.com",
			phone: {
				area_code: "11",
				number: 22223333
			},
			identification: {
				type: "DNI",
				number: "40404040"
			},
			address:{
				zip_code: "3260",
				street_name: "Calle falsa",
				street_number: 123
			}
		},

		auto_return: "approved",

		back_urls: {
			success: `http://localhost:3001/payment/success`,
			failure: `http//localhost:3001/payment/failure`,
			pending: `http//localhost:3001/payment/pending`,
		},
		notification_url: `${URL_NGROK}/payment/webhook`,
	});

	
	return result;
};

export const createNotification = async (id: number) => {
	const data = await mercadopago.payment.findById(id);
	return data.body;
};

export const createNewPayment = async (data: any) => {
	const amount = data.transaction_details.net_received_amount;

	console.log(data);
	
	//! En modo de prueba, parece que al no especificar la info del payer,
	//! mercadopago pone uno que no es ninguno de los que usamos xD, asi que este
	//!campo queda vacío y por tanto no se guarda en la db
	const buyerFound = await User.findOne({
		where: {
			email: data.additional_info.payer.first_name,
		},
	});

	const sellerFound = await Product.findOne({
			where:{
				userID: data.additional_info.items[0].id
			}
	})



	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	currentDate.setDate(currentDay + 28);


	const newPayment = await Payments.create({
		order: data.id,
		sellerID: sellerFound!.id,
		buyerID: buyerFound!.id,
		grossAmount: amount,
		netAmount: amount - amount / 8,
		limitDate: currentDate,
		resume: data
	});

	return newPayment;
};

import { productProps } from "../interfaces/propsModel";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import Payments from "../models/Payments";
import User from "../models/User";
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
				quantity: 1,
			},
		],
		payer: {
			identification: undefined,
			name: undefined,
			email: undefined,
			phone: undefined,
			address: undefined,
		},

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

export const createdNewPayment = async (data: any) => {
	const amount = data.transaction_details.net_received_amount;

	//! En modo de prueba, parece que al no especificar la info del payer,
	//! mercadopago pone uno que no es ninguno de los que usamos xD, asi que este
	//!campo queda vacío y por tanto no se guarda en la db
	const userFound = await User.findOne({
		where: {
			email: data.payer.email,
		},
	});

	console.log(userFound);

	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	currentDate.setDate(currentDay + 28);

	const dataPayment = {
		id: data.id,
		sellerID: Number(data.additional_info.items[0].id),
		buyerID: userFound!.id,
		grossAmount: amount,
		netAmount: amount - amount / 8,
		limitDate: currentDate,
		resume: data,
	};

	console.log(dataPayment);

	// const sellerID =  Number(dataPayment.sellerID)

	const newPayment = await Payments.create(dataPayment);

	return newPayment;
};

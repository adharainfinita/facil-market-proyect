import { productProps } from "../interfaces/propsModel";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
dotenv.config();
const { URL_HOST, TOKEN, URL_NGROK } = process.env;

export const createOrder = async (product: productProps) => {
	mercadopago.configure({
		access_token: TOKEN!,
	});

	//Si quiero crear una orden de compras de muchos productos, debería hacer un map del product
	const result = await mercadopago.preferences.create({
		items: [
			{
				title: product.name,
				unit_price: product.price,
				currency_id: "ARS",
				picture_url: product.image,
				quantity: 1,
			},
		],
		back_urls: {
			success: `${URL_HOST}product/detail/${product.id}`,
			failure: `${URL_HOST}product/payment/failure`,
			pending: `${URL_HOST}product/payment/pending`,
		},
		notification_url: `${URL_NGROK}/payment/webhook`,
	});

	return result;
};

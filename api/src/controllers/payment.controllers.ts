import { BuyProduct } from "../interfaces/propsModel";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
dotenv.config();
const { URL_HOST, TOKEN, URL_NGROK } = process.env;

export const createOrder = async (product: BuyProduct) => {
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
				quantity: product.quantity,
			},
		],
		back_urls: {
			success: `${URL_HOST}detail/${product.id}`,
			failure: `${URL_HOST}detail/${product.id}`,
			pending: `${URL_HOST}detail/${product.id}`,
		},
		notification_url: `${URL_NGROK}payment/webhook`,
	});

	return result;
};

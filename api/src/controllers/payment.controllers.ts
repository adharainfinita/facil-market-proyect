import { productProps } from "../utils/propsModel";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
dotenv.config()
const {URL_HOST, PORT } = process.env

export const createOrder = async (product: productProps) => {
	mercadopago.configure({
		access_token:
			"TEST-823447841070958-062104-d5ff3077b69593507bde79ad998aced7-1404496042",
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
        description: product.description,

			},
		],
    back_urls: {
      success: `${URL_HOST}:${PORT}/product/payment/success`,
      failure: `${URL_HOST}:${PORT}/product/payment/failure`,
      pending: `${URL_HOST}:${PORT}/product/payment/pending`
    },
    notification_url: `https://8ab3-200-115-26-133.sa.ngrok.io/product/payment/webhook`
	});
  console.log(result);
  return result;
};




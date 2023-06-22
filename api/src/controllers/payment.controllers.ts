import { productProps } from "../utils/propsModel";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
dotenv.config();
const { URL_HOST, PORT_CLIENT, TOKEN } = process.env;

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
        description: product.description,
      },
    ],
    back_urls: {
      success: `${URL_HOST}:${PORT_CLIENT}/product/detail/${product.id}`,
      failure: `${URL_HOST}:${PORT_CLIENT}/product/payment/failure`,
      pending: `${URL_HOST}:${PORT_CLIENT}/product/payment/pending`,
    },
    notification_url: `https://72db-200-115-26-133.ngrok-free.app/product/payment/webhook`,
  });

  return result;
};

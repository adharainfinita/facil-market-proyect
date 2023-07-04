import { BuyProduct } from "../interfaces/propsModel";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import Payments from "../models/Payments";
import User from "../models/User";
import Product from "../models/Product";
import { transporter } from "../config/mailer";
import { createPurchase } from "./purchaseController";

dotenv.config();
const { TOKEN, URL_NGROK, URL_HOST } = process.env;

export const createOrder = async (
	userID: number,
	products: Array<BuyProduct>,
) => {
	const userInfo = await User.findByPk(userID);

	mercadopago.configure({
		access_token: TOKEN!,
	});

	const result = await mercadopago.preferences.create({
		items: products.map((product: BuyProduct) => {
			return {
				id: String(product.id),
				title: product.name,
				unit_price: product.price,
				category_id: String(product.categoryID),
				currency_id: "ARS",
				picture_url: product.image,
				quantity: product.quantity,
			};
		}),

		payer: {
			name: userInfo?.email,
			email: userInfo?.email,
			// phone: {
			// 	area_code: "54",
			// 	number: '3644123456'},,

			identification: {
				type: "DNI",
				number: "40404040",
			},
			address: {
				zip_code: "3260",
				street_name: "Calle falsa",
				street_number: 123,
			},
		},

		auto_return: "approved",

		back_urls: {
			success: `${URL_HOST}/products`,
			failure: `${URL_HOST}/products`,
			pending: `${URL_HOST}/products`,
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

	const buyerFound = await User.findOne({
		where: {
			email: data.additional_info.payer.first_name,
		},
	});
	let count = 0;
	const sellersFound = [];
	const newPayments = [];

	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	currentDate.setDate(currentDay + 28);

	while (data.additional_info.items.length !== count) {
		let idProduct = Number(data.additional_info.items[count].id);
		sellersFound.push(await Product.findByPk(idProduct));

		await createPurchase({
			userId: buyerFound!.id,
			productId: sellersFound[count]?.id,
			paymentId: data.id + sellersFound[count]?.userID,
		});

		const newPayment = await Payments.create({
			order: data.id + sellersFound[count]?.userID,
			sellerID: sellersFound[count]?.userID,
			buyerID: buyerFound!.id,
			grossAmount: amount,
			netAmount: amount - amount / 8,
			limitDate: currentDate,
			items: sellersFound,
		});
		newPayments.push(newPayment);
		count++;
	}

	return newPayments;
};

export const getPaymentsFromDB = async () => {
	return await Payments.findAll();
};

export const sendPurchaseNotification = async (receipt: Array<Payments>) => {
	const urlPurchase = `${URL_HOST}/profile`;

	const email = await User.findByPk(receipt[0].buyerID);

	const products = receipt.map((payment) =>
		payment.items
			.map((item) => `<li>${item.name} - $${item.price}</li>`)
			.join("")
	);

	const sellerIDs = receipt.map((payment) => payment.sellerID);
	const sellersFound = await findSellersByID(sellerIDs);

	//? Agregar número de telefono y dirección de los vendedores
	await transporter.sendMail({
		from: '"Soporte de Facil Market" <benjaminszodo@gmail.com>',
		to: email?.email,
		subject: "¡Tu compra se ha realizaco con éxito!",
		html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
		<img src="https://cspmarketplaceprd.s3.us-west-2.amazonaws.com/media-files/marketplace_logo_large.png" alt="Logo de Facil Market" style="max-width: 200px; margin-bottom: 10px;">
		<p style="color: #1D428A; font-family: 'Gochi Hand', cursive; font-size: 24px; margin-top: 0;">Facil-Market Team</p>
		<h1 style="color: #333333; font-size: 28px; margin-bottom: 20px;">¡Hola, ${
			email?.fullName
		}!</h1>
		<p style="color: #333333; font-size: 18px;">¡Aquí tienes un resumen de tu compra! 😎</p>
		<ul style="color: #333333; font-size: 16px; list-style: none; padding-left: 0;">
			${products.join("")}
		</ul>
		<hr style="border: none; border-top: 1px solid #FF90BB; margin: 40px 0;">
		<p style="color: #333333; font-size: 18px;">Contacta a ${
			receipt.length > 1 ? "los vendedores" : "el vendedor"
		} para coordinar la entrega de ${
			receipt.length > 1 ? "los productos" : "el producto"
		}. Recuerda tener en cuenta tu seguridad.</p>
		<p style="color: #333333; font-size: 18px;">Te proporcionamos la siguiente información de contacto:</p>
		${sellersFound
			.map(
				(seller) => `
					<p style="color: #333333; font-size: 16px;">
						<strong>${seller?.fullName}</strong>: ${seller?.email}
					</p>
				`
			)
			.join("")}
		<p style="color: #333333; font-size: 18px;">No dudes en consultarnos ante cualquier duda o problema ♥.</p>
		<p style="color: #333333; font-size: 18px;">Visualiza tus compras en: <a href="${urlPurchase}" style="color: #1D428A; text-decoration: none;">${urlPurchase}</a></p>
		<p style="color: #333333; font-size: 18px;">Volver a la app: <a href="${URL_HOST}" style="color: #1D428A; text-decoration: none;">${URL_HOST}</a></p></div>`,
	});
};

export const findSellersByID = async (sellers: Array<number>) => {
	const contactsFound = await Promise.all(
		sellers.map(async (match) => {
			const user = await User.findOne({
				where: {
					id: match,
				},
			});
			return user;
		})
	);
	return contactsFound;
};

import { paymentProps, PaymentProductsProps} from "../interfaces/propsModel";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import Payments from "../models/Payments";
import User from "../models/User";
import Product from "../models/Product";
import { transporter } from "../config/mailer";

dotenv.config();
const { TOKEN, URL_NGROK, URL_HOST } = process.env;


export const createOrder = async ({products}: PaymentProductsProps) => {
	//Necesito que además del producto, me envíen el id del usuario logueado que está
	// ejecutando la compra
	// lo busco en  la db y lleno los campos de payer
	mercadopago.configure({
		access_token: TOKEN!,
	});

	//Si quiero crear una orden de compras de muchos productos, debería hacer un map del product
	
	const result = await mercadopago.preferences.create({

/* 		items: [
			{
				id: String(product.id),
				title: product.name,
				unit_price: product.price,
				category_id: String(product.categoryID),
				currency_id: "ARS",
				picture_url: product.image,
				quantity: product.quantity,
			},
		],
 */

		items: products.map((product: any) => {
			return 	{
			id: String(product.id),
			title: product.name,
			unit_price: product.price,
			category_id: String(product.categoryID),
			currency_id: "ARS",
			picture_url: product.image,
			quantity: product.unities,
			}
		})
		
		,
		payer: {
			name: "adharanosalevich@gmail.com",
			email: "adharanosalevich@gmail.com",
			phone: {
				area_code: "11",
				number: 22223333,
			},
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


	//! En modo de prueba, parece que al no especificar la info del payer,
	//! mercadopago pone uno que no es ninguno de los que usamos xD, asi que este
	//!campo queda vacío y por tanto no se guarda en la db
	const buyerFound = await User.findOne({
		where: {
			email: data.additional_info.payer.first_name,
		},
	});

	const sellerFound = await Product.findOne({
		where: {
			userID: data.additional_info.items[0].id,
		},
	});
	console.log(sellerFound);
	

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
		resume: data,
	});

	return newPayment;
};

export const getPaymentsFromDB = async () => {
	return await Payments.findAll();
};

export const sendPurchaseNotification = async (receipt: paymentProps) => {
	const urlPurchase = `${URL_HOST}/profile`;

	const email = await User.findByPk(receipt.buyerID);
	let resume = receipt.resume;
	const items = resume?.additional_info.items.map((product) => product);

	const sellers = await findSellersByID(email!.id);

	//? Agregar número de telefono y dirección de los vendedores

	await transporter.sendMail({
		from: '"Soporte de Facil Market" <benjaminszodo@gmail.com>',
		to: email?.email,
		subject: "¡Tu compra se ha realizaco con éxito!",
		html: `<div style="font-family: Arial, sans-serif;background-color: #f4f4f4;
		padding: 20px; text-align: center;" 
		<img src="https://cspmarketplaceprd.s3.us-west-2.amazonaws.com/media-files/marketplace_logo_large.png" alt="Logo de Facil Market" style="max-width: 200px; margin-bottom: 10px;">
		<p style="color: #1D428A; font-family: 'Gochi Hand', cursive; font-size: 20px; margin-top: 0;">Facil-Market Team</p>
		<h1 style="color: #333333;">¡Hola, ${email?.fullName}!</h1>
		<p style="color: #333333;">¡Aquí tienes un resumen de tu compra! 😎</p>
		<p style="color: #333333;">Productos comprados: ${items.map(
			(match) => `<p>${match.title} ${ match.unit_price}</p>`
		)}.</p>
		<p style="color: #333333;">Contactate con ${
			items.length > 1 ? "los vendedores" : "el vendedor"
		} para coordinar la entrega de 
		${
			items.length > 1 ? "los productos" : "el producto"
		}. Recuerda tener en cuenta tu seguridad.</p>
		<p style="color: #333333;">Te proporcionamos la información de contacto:</p>
		<p style="color: #333333;">${sellers.map((match) => `<p>${match?.fullName} ${match?.email}</p>`)}</p>
		<p style="color: #333333;"> No dudes en consultarnos ante cualquier duda o problema♥.<p/>
		<p style="color: #333333;">Visualiza tus compras en: <a href="${urlPurchase}"</a></p>
		<p style="color: #333333;">Volver a la app: <a href="${URL_HOST}"</a></p>
		<p style="color: #333333;">Ver comprobante <a href=""</a>Comprobante</p>
		<p style="color: #333333;">¡Saludos cordiales!</p>
		<p style="color: #333333;">El equipo de Facil Market</p>
	</div>`,
	});
};

export const findSellersByID = async (buyerID: number) => {
	const sellersIdOnPayments = await Payments.findAll({
		where: {
			buyerID: buyerID,
		},
	});
	const contactsFound = await Promise.all(
		sellersIdOnPayments.map(async (match) => {
			const user = await User.findOne({
				where: {
					id: match.sellerID,
				},
			});
			return user;
		})
	);
	return contactsFound;
};

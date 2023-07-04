import Purchase from "../models/Purchase";
import { purchases } from "../interfaces/propsModel";

//-----------------------

export const createPurchase = async ({
	userId,
	products,
	paymentId,
}: purchases) => {
	const [purchase, created] = await Purchase.findOrCreate({
		where: { paymentId },
		defaults: { userId, products, paymentId },
	});

	if (created) {
		return purchase;
	} else {
		throw Error("La compra ya se encuentra en tus compras");
	}
};
//-----------------------

export const getPurchaseByUser = async (id: number) =>
	await Purchase.findAll({
		where: {
			userId: id,
		}
	});

//-----------------------

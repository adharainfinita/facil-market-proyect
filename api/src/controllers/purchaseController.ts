import Purchase from "../models/Purchase";
import { purchases } from "../interfaces/propsModel";

//-----------------------

export const createPurchase = async ({ userId, productId}: purchases) => {
	
	return await Purchase.create({ userId, productId });
};
//-----------------------

export const getPurchaseByUser = async (id : number) => await Purchase.findAll({
	where: {
	  userId: id
	},
	include: ["product"]
  });

//-----------------------



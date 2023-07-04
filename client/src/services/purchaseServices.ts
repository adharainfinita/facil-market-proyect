import axios from "axios";
import { BuyProduct } from "../utils/interfaces";
const URL_HOST = import.meta.env.VITE_HOST;

interface localProps {
	userId: number;
	products: Array<BuyProduct>;
	paymentId: number;
}

export const postUserPurchase = async ({
	userId,
	products,
	paymentId,
}: localProps) => {
	try {
		const response = await axios.post(`${URL_HOST}/purchase`, {
			userId,
			products,
			paymentId,
		});
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		throw errorMessage;
	}
};

export const getPurchasesByUser = async (id: number) => {
	try {
		const response = await axios(`${URL_HOST}/purchase/${id}`);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		throw errorMessage;
	}
};

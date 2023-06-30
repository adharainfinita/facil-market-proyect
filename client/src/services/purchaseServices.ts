import axios from "axios";
const URL_HOST = import.meta.env.VITE_HOST;

interface localProps {
	userId: number
	productId: number
	paymentId: number
}

export const postUserPurchase = async ({userId, productId, paymentId}: localProps) => {
	try {
		const response = await axios.post(`${URL_HOST}/purchase`, {
			userId, productId, paymentId
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
		const response = await axios(`${URL_HOST}/purchase/${id}`)
		return response.data
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
		errorMessage = error.response?.data?.error || errorMessage;
		}
		throw errorMessage;
	}
}
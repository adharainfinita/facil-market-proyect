import axios, { AxiosResponse } from "axios";
const URL_HOST = import.meta.env.VITE_HOST;
import { Review } from "../utils/interfaces";
import swal from 'sweetalert'

export const createReview = async (
	userID: number,
	fullName: string,
	productID: number,
	text: string,
	rating: number
) => {
	try {
		const response = await axios.post<{ newReview: any }>(
			`${URL_HOST}/review`,
			{
				userID,
				fullName,
				productID,
				text,
				rating,
			}
		);

		return response.data.newReview;
	} catch (error: any) {
		throw new Error(error.response.data.error);
	}
};

export const getAllReviewsProduct = async (
	productId: number
): Promise<Review[]> => {
	try {
		const response: AxiosResponse<Review[]> = await axios.get(
			`${URL_HOST}/review/${productId}`
		);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response.data.error);
	}
};

export const deleteReview = async (reviewId: number): Promise<void> => {
	try {
		// Realizar la solicitud DELETE al endpoint correspondiente en el backend
		await axios.delete(`${URL_HOST}/review`, {
			data: {
				reviewId: reviewId,
			},
		});

		swal("La review ha sido eliminada con éxito",'☺','success');
	} catch (error) {
		swal("Error al eliminar la review:", 'error', 'error');
	}
};

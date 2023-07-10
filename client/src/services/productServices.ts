import {
	BuyProduct,
	FormCreateProduct,
	Product,
	Stock,
} from "../utils/interfaces";
import axios, { AxiosHeaders } from "axios";
const URL_HOST = import.meta.env.VITE_HOST;
import swal from "sweetalert";

//? OBTENER PRODUCTOS POR NOMBRE
export const getProductsByName = async (name: string) => {
	try {
		const { data } = await axios(`${URL_HOST}/product/search?name=${name}`);
		if (data.length === 0) {
			swal("Producto no encontrado");
			return;
		}
		return data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal({
			title: "🤖",
			text: errorMessage,
			icon: "warning",
		});
		throw error;
	}
};

//? OBTENER PRODUCTOS POR ID
export const getProductsById = async (id: number) => {
	try {
		const response = await axios(`${URL_HOST}/product/${id}`);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal({
			title: "🤖",
			text: errorMessage,
			icon: "warning",
		});
		throw error;
	}
};

//? CREAR UN PRODUCTO
export const postProduct = async (
	data: FormCreateProduct,
	headers: Partial<AxiosHeaders["headers"]>
) => {
	try {
		const response = await axios.post(`${URL_HOST}/product`, data, { headers });
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal({
			title: "🤖",
			text: errorMessage,
			icon: "warning",
		});
		throw error;
	}
};

//? OBTENER TODOS LOS PRODUCTOS
export const getAllProducts = async () => {
	try {
		const response = await axios(`${URL_HOST}/product`);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal({
			title: "🤖",
			text: errorMessage,
			icon: "warning",
		});
		throw error;
	}
};

//? COMPRAR UN PRODUCTO
export const buyProduct = async (
	product: Array<BuyProduct>,
	userID: number
) => {
	try {
		const { data } = await axios.post(
			`${URL_HOST}/payment/order/${userID}`,
			product
		);

		return data;
	} catch (error: any) {
		console.log(error.message);
	}
};

//? BORRAR UN PRODUCTO
export const deleteProduct = async (productID: number) => {
	try {
		const { data } = await axios.put(`${URL_HOST}/product/delete/${productID}`);
		return data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal({
			title: "🤖",
			text: errorMessage,
			icon: "warning",
		});
		throw error;
	}
};

//? ACTUALIZAR UN PRODUCTO
export const updateProduct = async (product: Product) => {
	try {
		const { data } = await axios.put(
			`${URL_HOST}/product/${product.id}`,
			product
		);
		return data;
	} catch (error: any) {
		console.log(error.message);
	}
};

//? ACTUALIZAR EL STOCK
export const updateStock = async (product: Stock) => {
	try {
		const { data } = await axios.put(
			`${URL_HOST}/product/${product.id}/stock`,
			product
		);
		return data;
	} catch (error: any) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal("Atención", `Es aqui ${errorMessage}`, "error");
		throw error;
	}
};

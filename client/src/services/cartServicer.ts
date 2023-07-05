import axios from "axios";
import { ArrayCart } from "../utils/interfaces";
const URL_HOST = import.meta.env.VITE_HOST;

export const getAllItems = async (userId: number) => {
	try {
		const res = await axios.get(`${URL_HOST}/cart/${userId}`);
		return res.data;
	} catch (error) {
		console.error(error);
		throw new Error("Error al obtener los elementos del carrito");
	}
};

export const createCart = async (userId: number) => {
	try {
		const res = await axios.post(`${URL_HOST}/cart/${userId}`);
		return res.data;
	} catch (error) {
		console.error(error);
		throw new Error("Error al agregar el elemento al carrito");
	}
};

export const updateItem = async (userId: number, products: Array<ArrayCart>) => {
	try {
		const res = await axios.put(`${URL_HOST}/cart/${userId}`, products);
		return res.data;
	} catch (error) {
		throw new Error("Error al actualizar el carrito de compras");
	}
};

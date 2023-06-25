import axios from "axios";
// import { URL_API } from "../utils/URLS";
import { LoginData, NewUser } from "../utils/interfaces";
const URL_HOST = import.meta.env.VITE_HOST;
// const URL_HOST = import.meta.env.VITE_API;
import { user } from "../utils/interfaces";

export const postUser = async (userData: NewUser) => {
	try {
		const response = await axios.post(`${URL_HOST}/register`, userData);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		throw errorMessage;
	}
};

export const getAllUsers = async () => {
	try {
		const response = await axios.get(`${URL_HOST}/user`);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		alert(errorMessage);
		throw error;
	}
};

export const updateUser = async (userId: string, userData: user) => {
	try {
		const response = await axios.put(`${URL_HOST}/user/${userId}`, userData);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		alert(errorMessage);
		throw error;
	}
};

export const logUser = async (logData: LoginData) => {
	try {
		const { data } = await axios.post(`${URL_HOST}/login`, logData);
		return data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}

		throw errorMessage;
	}
};

export const getUserById = async (userId: string): Promise<user | null> => {
	try {
		const response = await axios.get(`http://localhost:3001/user/${userId}`);
		return response.data;
	} catch (error) {
		console.log("Error al obtener los datos del usuario:", error);
		return null;
	}
};

import axios from "axios";
// import { URL_API } from "../utils/URLS";
import { LoginData, NewUser } from "../utils/interfaces";
const URL_HOST = import.meta.env.VITE_HOST;
// const URL_HOST = import.meta.env.VITE_API;
import { user } from "../utils/interfaces";
import swal from 'sweetalert'


//? REGISTAR UN USUARIO
export const postUser = async (userData: NewUser) => {
	try {
		const response = await axios.post(`${URL_HOST}/auth/register`, userData);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		throw errorMessage;
	}
};

//? OBTENER TODOS LOS USUARIOS
export const getAllUsers = async () => {
	try {
		const response = await axios.get(`${URL_HOST}/user`);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal({
			title: "🤖",
			text: errorMessage,
			icon: "error",
		});
		throw error;
	}
};

//? BORRAR UN USUARIO
export const deleteUser = async (userID: number) => {
	try {
		const response = await axios.put(`${URL_HOST}/user/delete/${userID}`);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal(errorMessage, '😣','error');
		throw error;
	}
};

//? ACTUALIZAR UN USUARIO
export const updateUser = async (userId: string | undefined, userData: user) => {
	try {
		const response = await axios.put(`${URL_HOST}/user/${userId}`, userData);
		return response.data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}
		swal({
			title: "🤖",
			text: errorMessage,
			icon: "error",
		});
		throw error;
	}
};

//? AUTHENTICAR UN USUARIO
export const logUser = async (logData: LoginData) => {
	try {
		const { data } = await axios.post(`${URL_HOST}/auth/login`, logData);

		return data;
	} catch (error) {
		let errorMessage = "An error occurred";
		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.data?.error || errorMessage;
		}

		throw errorMessage;
	}
};

//? OBTENER UN USUARIO POR ID
export const getUserById = async (userId: string | undefined) => {
	try {
		const response = await axios.get(`${URL_HOST}/user/${userId}`);

		return response.data;
	} catch (error:any) {
		swal("Error al obtener los datos del usuario:", `${error.message}`, 'error');
	}
};

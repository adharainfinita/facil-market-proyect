import axios from "axios";
import { NewUser} from "../utils/interfaces";
import { URL_API } from "../utils/URLS";
const URL_HOST = import.meta.env.VITE_HOST;
import { UserData } from "../utils/interfaces";

export const postUser = async (userData: NewUser) => {
	try {
		const { data } = await axios.post(`${URL_HOST}/user`, userData);
		return data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};

export const getAllUsers = async () => {
	try {
		const { data } = await axios(`${URL_HOST}/user`);
		return data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};

export const updateUser = async (userId: string, userData: UserData) => {
	try {
	  const { data } = await axios.put(`${URL_API}/${userId}`, userData);
	  return data;
	} catch (error: any) {
	  const errorMessage = error.response
		? error.response.data.error
		: error.message;
	  alert(errorMessage);
	}
  };
  
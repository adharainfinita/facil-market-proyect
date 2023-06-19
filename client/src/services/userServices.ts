import axios from "axios";
import { NewUser} from "../utils/interfaces";
import { URL_API } from "../utils/URLS";

export const postUser = async (userData: NewUser) => {
	try {
		const { data } = await axios.post(`${URL_API}/user`, userData);
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
		const { data } = await axios(`${URL_API}/user`);
		return data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};

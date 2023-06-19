import axios from "axios";
import { URL_API } from "../utils/URLS";


export interface Category {
	name: string;
}

export const postCategory = async (data: string) => {
	try {
		const response = await axios.post(`${URL_API}/category`, {
			name: data,
		});
		console.log(`Post successful for category: ${data}`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(`Error posting category: ${data}`);
		return null;
	}
};

export const getCategory = async () => {
	try {
		const response = await axios(`${URL_API}/category`);
		return response.data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};

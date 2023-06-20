import axios from "axios";
const URL_HOST = import.meta.env.VITE_HOST;
// import { URL_API } from "../utils/URLS";
//const URL_API = import.meta.env.VITE_API;


export interface Category {
	name: string;
}

export const postCategory = async (data: string) => {
	try {
		const response = await axios.post(`${URL_HOST}/category`, {
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
		const response = await axios(`${URL_HOST}/category`);
		return response.data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};

import axios from "axios";
import { FormData } from "../utils/interfaces";


export const getProductsByName = async (name: string) => {
	try {
		const response = await axios(
			`http://localhost:3001/product/search?name=${name}`
		);
		return response.data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};

// export const getProductsById = async(id:number) =>{
//   console.log(id);

//   try {
//     const response = await axios(`http://localhost:3001/product/${id}`);
//     return response.data;
//   } catch (error: any) {
//     const errorMessage = error.response
//     ? error.response.data.error
//     : error.message;
//     alert(errorMessage);
//   }
// }

//? Create product
export const postProduct = async (product: FormData) => {
	try {
		const response = await axios.post("http://localhost:3001/product", product);
		return response.data;
	} catch (error: any) {
		return error.message;
	}
};



export const getUsers = async () => {
	try {
		const response = await axios("http://localhost:3001/product");
		return response.data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};
import axios from "axios";
import { FormCreateProduct } from "../utils/interfaces";
import { URL_API } from "../utils/URLS";


export const getProductsByName = async (name: string) => {
	try {
		const { data } = await axios(
			`${URL_API}/product/search?name=${name}`
		);
		if (data.length === 0) {
			window.alert("Producto no encontrado");
			return;
		}
		return data;
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
export const postProduct = async (product: FormCreateProduct) => {
	try {
		const { data } = await axios.post(`${URL_API}/product`, product);

		
		return data;
	} catch (error: any) {
		return error.message;
	}
};

export const getAllProducts = async () => {
	try {
		const { data } = await axios(`${URL_API}/product`);
		return data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};

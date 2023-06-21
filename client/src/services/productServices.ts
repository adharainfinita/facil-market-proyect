import axios from "axios";
import { FormCreateProduct } from "../utils/interfaces";
const URL_HOST = import.meta.env.VITE_HOST;
//const URL_API = import.meta.env.VITE_API;

export const getProductsByName = async (name: string) => {
  try {
    const { data } = await axios(`${URL_HOST}/product/search?name=${name}`);
    if (data.length === 0) {
      window.alert("Producto no encontrado");
      return;
    }
    return data;
  } catch (error) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }
    alert(errorMessage);
    throw error;
  }
};

//? Get Product By ID
export const getProductsById = async (id: number) => {
  try {
    const response = await axios(`${URL_HOST}/product/${id}`);
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

//? Create product
export const postProduct = async (product: FormCreateProduct) => {
  try {
    const { data } = await axios.post(`${URL_HOST}/product`, product);
    return data;
  } catch (error) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }
    alert(errorMessage);
    throw error;
  }
};

//? Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const { data } = await axios(`${URL_HOST}/product`);
    return data;
  } catch (error) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }
    alert(errorMessage);
    throw error;
  }
};

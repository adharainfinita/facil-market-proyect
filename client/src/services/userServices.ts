import axios from "axios";
import { NewUser } from "../utils/interfaces";
import { URL_API } from "../utils/URLS";
const URL_HOST = import.meta.env.VITE_HOST;
import { UserData } from "../utils/interfaces";

export const postUser = async (userData: NewUser) => {
  try {
    const response = await axios.post(`${URL_HOST}/user`, userData);
    return response.data;
  } catch (error) {
    let errorMessage = 'An error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }
    alert(errorMessage);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${URL_HOST}/user`);
    return response.data;
  } catch (error) {
    let errorMessage = 'An error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }
    alert(errorMessage);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: UserData) => {
  try {
    const response = await axios.put(`${URL_API}/${userId}`, userData);
    return response.data;
  } catch (error) {
    let errorMessage = 'An error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }
    alert(errorMessage);
    throw error;
  }
};

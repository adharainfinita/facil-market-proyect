import axios from "axios";
import { NewUser, UserData} from "../utils/interfaces";

export const postUser = async (userData: NewUser) => {
	try {
		const { data } = await axios.post("http://localhost:3001/user", userData);
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
		const { data } = await axios("http://localhost:3001/user");
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
	  const { data } = await axios.put(`http://localhost:3001/user/${userId}`, userData);
	  return data;
	} catch (error: any) {
	  const errorMessage = error.response
		? error.response.data.error
		: error.message;
	  alert(errorMessage);
	}
  };
  
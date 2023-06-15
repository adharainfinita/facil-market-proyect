import axios from "axios";
import { User } from "../utils/interfaces";


export const postUser = async(data: User) =>{ 
  try {
    const response = await axios.post("http://localhost:3001/user", data);
    return response.data
  } catch (error: any) {
    const errorMessage = error.response
            ? error.response.data.error
            : error.message;
            alert(errorMessage);
  }
  
}

export const getUsers = async() =>{
  try {
    const response = await axios("http://localhost:3001/user");
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response
    ? error.response.data.error
    : error.message;
    alert(errorMessage);
  }
}
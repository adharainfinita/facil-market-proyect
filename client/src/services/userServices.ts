import axios from "axios";
import {newUser } from "../utils/interfaces";


export const postUser = async(data: newUser) =>{ 
  try {
    const response = await axios.post("http://localhost:3001/user", data);
    console.log(response);
    
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
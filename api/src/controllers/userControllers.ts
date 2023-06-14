import { userProps } from "../utils/propsModel";
import User from "../models/User";

interface localProps{
	param: number | string
 }

export const createUser = async ({id, name, lastName, password, email, image}: userProps) => {
	
	const userFound = await findUser({param: email})
	if(!userFound){
		return await User.create({
		name, 
		lastName, 
		password, 
		email, 
		image})
	}
	
};


export const findUser = async({param}:localProps) =>{
	if(typeof param === "number"){
	   return await User.findOne({ where: { 
		  id: param
	   }})
	}
	return await User.findOne({
	   where:{
		  email: param
	   }})
 }

 export const findAllUsers = async() => await User.findAll();

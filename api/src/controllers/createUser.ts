import { userProps } from "../utils/propsModel";
import User from "../models/User";
import findUser from "./findUser";


const createUser = async ({id, name, lastName, password, email, image}: userProps) => {
	

	//? Verificar si ya existe el usuario
	const userExist = await findUser({id});

	if (userExist) {
		throw new Error("The user already exists");
	}

	return await User.create({
		name, 
		lastName, 
		password, 
		email, 
		image})
};

export default createUser;

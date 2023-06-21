import { userProps, loginData } from "../utils/propsModel";
import User from "../models/User";

interface localProps {
	param: number | string;
}


export const createUser = async ({
	id,
	name,
	lastName,
	password,
	email,
	image,
}: userProps) => {
	const userFound = await findUser({ param: email });
	if (!userFound) {
		return await User.create({
			name,
			lastName,
			password,
			email,
			image,
		});
	}
};

export const findUser = async ({ param }: localProps) => {
	if (typeof param === "number") {
		return await User.findOne({
			where: {
				id: param,
			},
		});
	}
	const emailExist = await User.findOne({
		where: {
			email: param,
		},
	});
	if (emailExist) {
		throw new Error("This email already exists");
	}
};

export const userCredentials = async (body: loginData) => {
	const userExist = await User.findOne({
		where: {
			email: body.email,
		},
	});

	const userInfo = {
		id: userExist?.id,
		name: userExist?.name,
		email: userExist?.email,
		image: userExist?.image
	}

	if(userExist && userExist.password === body.password){
		return userInfo
	}else if(userExist && userExist.password !== body.password){
		throw new Error("Contraseña incorrecta");
	}else{
		throw new Error("Email incorrecto");
	}
};

export const findAllUsers = async () => await User.findAll();

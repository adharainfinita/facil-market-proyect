import { userInterface, loginData } from "../interfaces/auth";
import User from "../models/User";
import { encrypt, verified } from "../utils/bcryptHandle";

export const createUser = async (authUser: userInterface) => {
	const userFound = await User.findOne({ where: { email: authUser.email } });

	if (userFound) {
		throw new Error("Ya existe este usuario");
	}

	const passwordHash = await encrypt(authUser.password);

	const newUser = await User.create({
		fullName: authUser.fullName,
		password: passwordHash,
		email: authUser.email,
		image: authUser?.image,
	});

	return newUser;
};

/* export const createUser = async ({
	id,
	fullName,
	password,
	email,
	image,
}: userInterface) => {
	const userFound = await findUser({ param: email });
	if (!userFound) {
		return await User.create({
			fullName,
			password,
			email,
			image,
		});
	}
};
 */

/* export const findUser = async ({ param }: any) => {
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
}; */

export const userCredentials = async (authLogin: loginData) => {
	const userExist = await User.findOne({
		where: {
			email: authLogin.email,
		},
	});

	//? Validacion user
	if (!userExist?.email) {
		throw new Error("ESTE EMAIL NO SE ENCUENTRA REGISTRADO");
	}

	//? traigo la password encryptada de la db y comparo con el recibido por body
	const passwordHash = userExist.password;
	const isCorrect = await verified(authLogin.password, passwordHash);

	//? si no coincide
	if (!isCorrect) throw new Error("CONTRASEÑA INCORRECTA");

	//? si todo sale bien retorno el usuario
	return userExist;

	/* const userInfo = {
		id: userExist?.id,
		fullName: userExist?.fullName,
		email: userExist?.email,
		image: userExist?.image,
	};

	if (userExist && userExist.password === authLogin.password) {
		return userInfo;
	} else if (userExist && userExist.password !== authLogin.password) {
		throw new Error("Contraseña incorrecta");
	} else {
		throw new Error("Email incorrecto");
	} */
};

export const findAllUsers = async () => await User.findAll();

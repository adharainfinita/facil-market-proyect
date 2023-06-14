import { userProps } from "../utils/propsModel";
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

export const findAllUsers = async () => await User.findAll();

import { userProps } from "../utils/propsModel";
import User from "../models/User";
import { transporter } from '../config/mailer';


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

export const sendEmailToUser = async(email:string) => {
	await transporter.sendMail({
		from: '"Mensaje de prueba" <benjaminszodo@gmail.com>', // sender address
		to: email, // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	  });
}



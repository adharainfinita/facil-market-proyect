import { Request, Response } from "express";
import User from "../models/User";

const createUser = async (req: Request, res: Response) => {
	try {
		const { name, lastName, password, email, image } = req.body;

		const data = {
			name,
			lastName,
			password,
			email,
			image,
		};

		//? Verificar si ya existe el usuario
		const userExist = await User.findOne({ where: { email } });

		if (userExist) {
			throw new Error("The user already exists");
		}

		const user = await User.create(data);
		return res.status(201).json(user);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default createUser;

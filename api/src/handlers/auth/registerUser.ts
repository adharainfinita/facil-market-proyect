import { Request, Response } from "express";
import { createUser, sendEmailToUser } from "../../controllers/authControllers";
import { userInterface } from "../../interfaces/auth";

const registerUser = async (req: Request, res: Response) => {
	const { fullName, password, email, image } = req.body;

	try {
		const data: userInterface = {
			id: 0,
			fullName,
			password,
			email,
			image,
		};

		const newUser = await createUser(data);

		if (!newUser) {
			throw new Error("NO TENGO USER");
		}

		sendEmailToUser(newUser.email, newUser.fullName);

		return res.status(201).json(newUser);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
export default registerUser;

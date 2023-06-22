import { Request, Response } from "express";
import { userCredentials } from "../../controllers/authControllers";
import { loginData } from "../../interfaces/auth";

const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const data: loginData = {
			email,
			password,
		};

		const logUser = await userCredentials(data);

		if (!logUser) {
			throw new Error("Fallo el inicio de seccion");
		}
		return res.status(201).json(logUser);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
export default loginUser;

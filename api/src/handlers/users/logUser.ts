import { Request, Response } from "express";
import { userCredentials } from "../../controllers/userControllers";
import { loginData } from "../../utils/propsModel";

const logUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const data: loginData = {
			email, password
		};

		const logUser = await userCredentials(data);

		if(logUser) return res.status(201).json(logUser);
		
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
export default logUser;

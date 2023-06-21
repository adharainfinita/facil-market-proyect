import { Request, Response } from "express";
import { createUser , sendEmailToUser } from "../../controllers/userControllers";
import { userProps } from "../../utils/propsModel";


const postUser = async (req: Request, res: Response) => {
	const { name, lastName, password, email, image } = req.body;

	try {
		const data: userProps = {
			id: 0,
			name,
			lastName,
			password,
			email,
			image,
		};

		const newUser = await createUser(data);

		if (newUser) {
			sendEmailToUser(newUser.email)
			return res.status(201).json(newUser);
		}
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
export default postUser;

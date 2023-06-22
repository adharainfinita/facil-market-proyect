import { Request, Response } from "express";
import { createUser } from "../../controllers/userControllers";
import { userProps } from "../../utils/propsModel";

const bcrypt = require('bcrypt')
const saltRounds = 10;

const postUser = async (req: Request, res: Response) => {
	const { name, lastName, password, email, image } = req.body;

	try {

		bcrypt.hash(password, saltRounds, async (error: any, hash: string) => {
			if(error) console.log(error);

			const data: userProps = {
				id: 0,
				name,
				lastName,
				password: hash,
				email,
				image,
			};
	
			const newUser = await createUser(data);

			if (newUser) {
				return res.status(201).json(newUser);
			}
	
		})
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
export default postUser;

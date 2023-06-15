import { Request, Response } from "express";
import { findAllUsers } from "../../controllers/userControllers";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const allUsers = await findAllUsers();

		return res.status(200).json(allUsers);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export default getAllUsers;

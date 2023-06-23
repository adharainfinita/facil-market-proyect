import { Request, Response } from "express";
import { findAllUsers } from "../../controllers/authControllers";
import { verifyToken } from "../../utils/jwtHandle";
import User from "../../models/User";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const allUsers = await findAllUsers();

		return res.status(200).json(allUsers);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

const getByToken = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const token = authorization?.split(" ")[1];

	if (token) {
		const data = verifyToken(token);

		return res.status(200).send(data);
	}

	return res.status(500).send("Salio todo mal");
};

const getUserById = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		return res.status(200).json(user);
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: "Error del servidor" });
	}
};

export { getAllUsers, getUserById, getByToken};

import { Request, Response } from "express";
import { changeUser } from "../../controllers/authControllers";

const updateUser = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const updates = req.body;

	try {
		const response = await changeUser(userId, updates);
		if (response) {
			return res
				.status(200)
				.json({ message: "Usuario actualizado exitosamente" });
		}
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: "Error del servidor" });
	}
};

export default updateUser;

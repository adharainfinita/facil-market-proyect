import { Request, Response } from "express";
import { updateActiveUser } from "../../controllers/authControllers";
import User from "../../models/User";

const deleteUser = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const response = await updateActiveUser(Number(userId));

		if (response) {
			const user = await User.findByPk(Number(userId));
			return res.status(200).json({
				message: "Usuario actualizado correctamente",
				user,
			});
		}
	} catch (error: any) {
		return res.status(500).json({ message: "Error del servidor" });
	}
};

export default deleteUser;

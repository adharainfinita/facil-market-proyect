import { Request, Response } from "express";
import User from "../../models/User";

const updateUser = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const updates = req.body;

	try {
		// Encuentra y actualiza el usuario por su ID
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		// Actualiza los campos proporcionados en el objeto de actualización
		Object.assign(user, updates);
		await user.save();

		return res
			.status(200)
			.json({ message: "Usuario actualizado exitosamente" });
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: "Error del servidor" });
	}
};

export default updateUser;

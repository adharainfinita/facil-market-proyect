import { Request, Response } from "express";
import User from "../../models/User"

const updatePassword = async (req: Request, res: Response) => {
	const {password} = req.body;
    const userId = req.params.userId;

    try {
        // Encuentra y actualiza el usuario por su ID
        const user = await User.findByPk(userId);
    
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
    
        // Actualiza la contraseña del usuario
        user.password = password;
        await user.save();
    
        return res.status(200).json({ message: "Contraseña actualizada exitosamente" });
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "Error del servidor" });
      }
    };
    
    
export default updatePassword;
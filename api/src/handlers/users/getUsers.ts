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


import User from "../../models/User"

const getUserById = async (req: Request, res: Response) => {
	const userId = req.params.userId;
  
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
  


export  {getAllUsers, getUserById };

import { Request, Response } from 'express';
import User from '../models/User';

const createUser = async function (req: Request, res: Response) {
  try {
    const { name, lastName, password, email, image } = req.body;

    const userData = {
      name,
      lastName,
      password,
      email,
      image,
    };

    // Verificar si la categoría ya existe
    const existingUser = await User.findOne({
        where: { email },
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "The user already exists" });
      }

    const user = await User.create(userData);

    return res.status(201).json(user);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user' });
  }
};

export default createUser;
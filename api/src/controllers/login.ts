import { Request, Response } from "express";
import User from "../models/User";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

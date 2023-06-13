import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Verificar si la categoría ya existe
    const existingCategory = await Category.findOne({
      where: { name },
    });

    if (existingCategory) {
      return res.status(400).json({ message: "The category already exists" });
    }

    const categoryData: any = {
      name,
    };

    const category = await Category.create(categoryData);

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating category" });
  }
};

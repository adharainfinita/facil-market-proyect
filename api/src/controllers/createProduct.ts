import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

export async function createProduct(req: Request, res: Response) {
  try {
    // Verificar si el usuario está registrado
    const userId = req.body.userId; // Suponiendo que el ID del usuario se pasa en el cuerpo de la solicitud
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si la categoría existe y obtener su nombre
    const categoryId = req.body.categoryId; // Suponiendo que el ID de la categoría se pasa en el cuerpo de la solicitud
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    const { name, description, stock, qualification, image, location, price } = req.body;

    // Crear el producto
    const product = await Product.create({
      name,
      description,
      stock,
      qualification,
      image,
      location,
      price,
      categoryID: category,
      userID: userId,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ha ocurrido un error al crear el producto' });
  }
}
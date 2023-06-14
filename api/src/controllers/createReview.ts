import { Request, Response } from 'express';
import Review from '../models/Review';
import User from '../models/User';
import Product from '../models/Product';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { userID, productID, text } = req.body;

    // Verificar si el usuario y el producto existen en la base de datos
    const userExists = await User.findByPk(userID);
    const productExists = await Product.findByPk(productID);

    if (!userExists || !productExists) {
      return res.status(404).json({ error: 'El usuario o el producto no existen' });
    }

    // Crear el nuevo review
    const review = await Review.create({
      userID,
      productID,
      text,
    });

    return res.status(201).json({ message: 'Review creado exitosamente', review });
  } catch (error) {
    console.error('Error al crear el review:', error);
    return res.status(500).json({ error: 'Error al crear el review' });
  }
};



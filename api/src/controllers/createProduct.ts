/* import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';
import Review from '../models/Review';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      stock,
      qualification,
      image,
      location,
      price,
      categoryID,
      userID,
      reviewsID
    } = req.body;

    // Verificar si la categoría existe
    const category = await Category.findByPk(categoryID);
    if (!category) {
      return res.status(400).json({ message: 'La categoría no existe' });
    }

    // Verificar si el usuario existe
    const user = await User.findByPk(userID);
    if (!user) {
      return res.status(400).json({ message: 'El usuario no existe' });
    }

    // Verificar si la reseña existe (si reviewsID está presente)
    if (reviewsID) {
      const review = await Review.findByPk(reviewsID);
      if (!review) {
        return res.status(400).json({ message: 'La reseña no existe' });
      }
    }

    // Crear el nuevo producto en la base de datos
    const product = await Product.create({
      name: name as string,
      description: description as string,
      stock: stock as number,
      qualification: qualification as number,
      image: image as string,
      location: location as string,
      price: price as number,
      categoryID: categoryID as number,
      userID: userID as number,
      reviewsID: reviewsID as number,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};
 */


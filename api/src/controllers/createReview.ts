import { Request, Response } from 'express';
import Review from '../models/Review';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const userID = req.params.userID; // Obtener el ID del usuario de los parámetros

    const reviewData: any = {
      text,
      userID,
    };

    const review = await Review.create(reviewData);

    return res.status(201).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating category' });
  }
};


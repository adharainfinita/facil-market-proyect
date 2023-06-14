import { Request, Response } from "express";
import { createProduct } from "../../controllers/productControllers";

const postProduct = async (req: Request, res: Response) => {
  try {
    //? Verificar si el usuario está registrado
    const {
      userID,
      categoryID,
      name,
      description,
      stock,
      rating,
      image,
      location,
      price,
    } = req.body;

    const data = {
      name,
      description,
      stock,
      rating,
      image,
      location,
      price,
      userID,
      categoryID,
    };

    const newProduct = await createProduct(data);
    return res.status(201).json(newProduct);
  } catch (error: any) {
      return res.status(500).json({ error: error.message });
  }
};

export default postProduct;

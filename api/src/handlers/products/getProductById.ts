import { Request, Response } from "express";
import { findProductById } from "../../controllers/productControllers";

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await findProductById(Number(productId));

    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export default getProductById;

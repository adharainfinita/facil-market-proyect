import { Request, Response } from "express";
import { changeItemsCart } from "../../controllers/cart.controllers";

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = req.body;

    const cartItem = await changeItemsCart(Number(id), cart);

    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

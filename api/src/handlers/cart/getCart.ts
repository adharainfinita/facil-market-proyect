import { Request, Response } from "express";
import Cart from "../../models/Cart";

// Ruta: GET /cart
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const cartItems = await Cart.findAll();
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los elementos del carrito" });
  }
};

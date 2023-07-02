import { Request, Response } from "express";
import Cart from "../../models/Cart";

export const removeItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findByPk(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Elemento del carrito no encontrado" });
    }

    await cartItem.destroy();
    res.json({ message: "Elemento del carrito eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el elemento del carrito" });
  }
};

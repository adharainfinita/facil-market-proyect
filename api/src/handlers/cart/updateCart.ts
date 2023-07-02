// import { Request, Response } from "express";
// import ShoppingCart from "../../models/Cart";

// export const updateCart = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const products = req.body.products;

//     // Realiza las validaciones necesarias antes de actualizar el carrito

//     // Encuentra el carrito de compras del usuario
//     const shoppingCart = await ShoppingCart.findOne({ where: { userId } });

//     if (!shoppingCart) {
//       return res.status(404).json({ error: "El carrito de compras no existe" });
//     }

//     // Actualiza los productos del carrito
//     shoppingCart.products = products;

//     // Guarda los cambios en la base de datos
//     await shoppingCart.save();

//     return res.json({ message: "Carrito de compras actualizado exitosamente" });
//   } catch (error) {
//     console.error("Error al actualizar el carrito de compras:", error);
//     return res
//       .status(500)
//       .json({ error: "Ocurrió un error al actualizar el carrito de compras" });
//   }
// };

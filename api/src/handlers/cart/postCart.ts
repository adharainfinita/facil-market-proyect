import { Request, Response } from "express";
import { createCart } from "../../controllers/cartController";

export const addItem = async (req: Request, res: Response) => {
  try {
    // Obtener los datos de la solicitud
    const { userId } = req.params
    const { products } = req.body;

    // Crear el carrito de compras
    const response = await createCart(Number(userId), products);

    // Enviar respuesta de éxito
    res.status(201).json(response);
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el carrito de compras:', error);
    res.status(500).json({ error: 'Error al crear el carrito de compras' });
  }
};
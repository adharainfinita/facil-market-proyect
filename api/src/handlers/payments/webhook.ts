import { Request, Response } from "express";
import mercadopago from "mercadopago";
//import Payments from "../../models/Payments";

const receivedWebhook = async (req: Request, res: Response) => {
  const payment = req.query;
  console.log(payment);
  try {
    if (payment.type === "payment") {
      const id = Number(payment["data.id"]);
      const data = await mercadopago.payment.findById(id);
      console.log(data);
      //Podría enviarse la información del recibo de pago para enviarselo por email al comprador
      // const response = await Payments.create({
      // se guarda la información de la compra en la db para pagar posteriormente
      // })
    }
    return res.sendStatus(204);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
export default receivedWebhook;

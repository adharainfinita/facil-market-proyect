import { Request, Response } from "express";
import { createNewPayment } from "../../controllers/payment.controllers";

const postPayment = async(req:Request, res:Response ) => {
  const id = req.params;

  
}

export default postPayment;


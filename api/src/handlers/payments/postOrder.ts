import { Request, Response } from "express";
import { createOrder } from "../../controllers/payment.controllers";



const postOrder = async(req: Request, res: Response) =>{
  const product = req.body

  
  const response = await createOrder(product);
 console.log(response);
 
    return res.status(200).send({url: response.body.init_point})
  
}

export default postOrder
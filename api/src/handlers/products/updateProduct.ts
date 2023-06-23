import { Request, Response } from "express";
import { changeProductProperties } from "../../controllers/productControllers";

const updateProduct = async(req: Request, res: Response) => {

  const product = req.body;
  console.log(product);

  const id = product.id;

  
  try {
    const response = await changeProductProperties(product, id);
    console.log(response);
    
    return res.status(200).json(response)
    

  } catch (error: any) {
    return res.status(400).json({error: error.message})
  }

}

export default updateProduct
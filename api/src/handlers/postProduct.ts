import { Request, Response } from "express";
// import { productProps } from "../utils/propsModel";
import createProduct from "../controllers/createProduct";

const postProduct = async (req: Request, res: Response) => {
	try {
		//? Verificar si el usuario está registrado
		const { userID, categoryID,
            name, description, 
            stock, rating, 
            image, location, 
            price } = req.body;

            const data= {
                name,
                description,
                stock,
                rating,
                image,
                location,
                price,
                userID,
                categoryID,
            }
            
		const newProduct = await createProduct(data);
		return res.status(201).json(newProduct);

	} catch (error: any) {
		return error.message.includes("not found")
        ? res.status(404).json({error: error.message})
        : res.status(500).json({ error: error.message });
	}
};

export default postProduct
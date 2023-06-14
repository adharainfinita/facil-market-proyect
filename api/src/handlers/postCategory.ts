import { Request, Response } from "express";
import createCategory from "../controllers/createCategory";

const postCategory = async(req: Request, res: Response) =>{
    try {
		const { name } = req.body;

		const newCategory = await createCategory({name})

		return res.status(201).json(newCategory);
	} catch (error:any) {
        return error.message.includes("alredy exists")
		? res.status(400).json({message:error.message})
		: res.status(500).json({ message: "Error creating category, pls verify the integrity of your request" });
	}
}

export default postCategory;
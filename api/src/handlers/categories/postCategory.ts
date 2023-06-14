import { Request, Response } from "express";
import { createCategory } from "../../controllers/categoryControllers";

const postCategory = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		const newCategory = await createCategory({ name });

		return res.status(201).json(newCategory);
<<<<<<< HEAD
	} catch (error:any) {

		return res.status(400).json({message:error.message})
=======
	} catch (error: any) {
		return res.status(400).json({ message: error.message });
>>>>>>> dbdf6f37b048f1fe4b2a137d14a807dc6fa3d6a2
	}
};

export default postCategory;

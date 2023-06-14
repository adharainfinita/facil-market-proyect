import { Request, Response } from "express";
import createUser from "../controllers/createUser";
import { userProps } from "../utils/propsModel";

 const postUser = async(req: Request, res: Response) => {
    
    const { name, lastName, password, email, image } = req.body;
     
     try {
		const data: userProps = {
			id: 0,
			name,
			lastName,
			password,
			email,
			image,
		};
        
		const newUser = await createUser(data);

		if(newUser){
            return res.status(201).json(newUser);
        }
        throw Error("Problem in data structure");

	} catch (error: any) {
       return error.message.includes("data") || error.message.includes("user")
        ? res.status(400).json({ error: error.message })
		: res.status(500).json({ error: error.message });
	}
}
export default postUser;
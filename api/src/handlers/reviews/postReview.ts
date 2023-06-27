import { Request, Response } from "express";
import { createReview } from "../../controllers/reviewControllers";
import { reviewProps } from "../../interfaces/propsModel";

const postReviews = async (req: Request, res: Response) => {
	try {
		const { userID, productID, text, rating, fullName } = req.body;

		const data: reviewProps = {
			id: 0,
			fullName,
			userID,
			productID,
			text,
			rating,
		};

		const newReview = await createReview(data);

		return res
			.status(201)
			.json({ message: "Review created successfully", newReview });
	} catch (error: any) {
		return error.message.includes("Not Found")
			? res.status(404).json({ error: error.message })
			: res.status(500).json({ error: error.message });
	}
};

export default postReviews;

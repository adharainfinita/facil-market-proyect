import { Request, Response } from "express";
import { createReview } from "../../controllers/reviewControllers";
import { reviewProps } from "../../utils/propsModel";

const postReviews = async (req: Request, res: Response) => {
	try {
		const { userID, productID, text, rating } = req.body;

		const data: reviewProps = {
			id: 0,
			userID,
			productID,
			text,
			rating,
		};

		const newReview = await createReview(data);

		return res
			.status(201)
			.json({ message: "Review creado exitosamente", newReview });
	} catch (error: any) {
		return error.message.includes("not found")
			? res.status(404).json({ error: error.message })
			: res.status(500).json({ error: error.message });
	}
};

export default postReviews;

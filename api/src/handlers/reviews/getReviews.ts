import { Request, Response } from "express";
import { findAllReviews } from "../../controllers/reviewControllers";
import { findAllReviewsByProductId } from "../../controllers/reviewControllers";

const getAllReviews = async (req: Request, res: Response) => {
	try {
		const allReviews = await findAllReviews();

		return res.status(200).json(allReviews);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllReviewsProduct = async (req: Request, res: Response) => {
	try {
		const productId = req.params.id;

		const reviews = await findAllReviewsByProductId(Number(productId));

		return res.status(200).json(reviews);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};

export { getAllReviews, getAllReviewsProduct };

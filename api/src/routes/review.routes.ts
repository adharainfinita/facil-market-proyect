import { Router } from "express";
const review = Router();

import postReview from "../handlers/reviews/postReview";
import {getAllReviews, getAllReviewsProduct} from "../handlers/reviews/getReviews";
import { reviewCreate } from "../validators/reviewValidation";
import deleteReviewHandler from "../handlers/reviews/deleteReview";
//! routes Create
review.post("/", reviewCreate, postReview);

//! routes Read
review.get("/", getAllReviews);
review.get("/:id", getAllReviewsProduct);

//! routes Update

//! routes Delete
review.delete("/", deleteReviewHandler)

export default review;

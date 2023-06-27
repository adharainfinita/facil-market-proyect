import { Router } from "express";
const review = Router();

import postReview from "../handlers/reviews/postReview";
import getAllReviews from "../handlers/reviews/getReviews";
import { reviewCreate } from "../validators/reviewValidation";

//! routes Create
review.post("/", reviewCreate, postReview);

//! routes Read
review.get("/", getAllReviews);

//! routes Update

//! routes Delete
export default review;

import { Router } from "express";
import createUser from "../controllers/createUser";
import createCategory from "../controllers/createCategory";
import createReview from "../controllers/createReview";
import createProduct from "../controllers/createProduct";
const router = Router();

//! POST
router.post("/user", createUser);

router.post("/category", createCategory);

router.post("/review", createReview);

router.post("/product", createProduct);

export default router;

import { Router } from "express";
import postUser from "../handlers/postUser";
import postCategory from "../handlers/postCategory";
import postReview from "../handlers/postReview";
import postProduct from "../handlers/postProduct";
const router = Router();
import getAllProducts from "../handlers/getProducts";
import getAllCategories from "../handlers/getCategories";
import getAllUsers from "../handlers/getUsers";
import getAllReviews from "../handlers/getReviews";

//* POST
router.post("/user", postUser);

router.post("/category", postCategory);

router.post("/review", postReview);

router.post("/product", postProduct);

//* GET

router.get("/product", getAllProducts);
router.get("/review", getAllReviews);
router.get("/user", getAllUsers);
router.get("/category", getAllCategories);





export default router;

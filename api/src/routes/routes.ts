import { Router } from "express";
import postUser from "../handlers/users/postUser";
import postCategory from "../handlers/categories/postCategory";
import postReview from "../handlers/reviews/postReview";
import postProduct from "../handlers/products/postProduct";
const router = Router();
import getAllProducts from "../handlers/products/getProducts";
import getAllCategories from "../handlers/categories/getCategories";
import getAllUsers from "../handlers/users/getUsers";
import getAllReviews from "../handlers/reviews/getReviews";
import { validateCreate } from "../validators/userValidation";
import categoryCreate from "../validators/categoryValidation";
import { productCreate } from "../validators/productValidation";
import { reviewCreate } from "../validators/reviewValidation";

//* POST
router.post("/review", reviewCreate , postReview);
router.post("/product", productCreate, postProduct);
router.post("/user", validateCreate, postUser);
router.post("/category", categoryCreate, postCategory);
<<<<<<< HEAD
=======
router.post("/review", reviewCreate, postReview);
>>>>>>> dbdf6f37b048f1fe4b2a137d14a807dc6fa3d6a2

//* GET
router.get("/product", getAllProducts);
router.get("/review", getAllReviews);
router.get("/user", getAllUsers);
router.get("/category", getAllCategories);

export default router;

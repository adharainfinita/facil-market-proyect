import { Router } from "express";
const router = Router();

//! Handlers POST
import postUser from "../handlers/users/postUser";
import postCategory from "../handlers/categories/postCategory";
import postReview from "../handlers/reviews/postReview";
import postProduct from "../handlers/products/postProduct";

//! Handlers GET
import getAllProducts from "../handlers/products/getAllProducts";
import getAllCategories from "../handlers/categories/getCategories";
import {getAllUsers, getUserById} from "../handlers/users/getUsers";
import getAllReviews from "../handlers/reviews/getReviews";
import getProductByName from "../handlers/products/getProductByName";
import getProductById from "../handlers/products/getProductById";

//! UTILS
import categoryCreate from "../validators/categoryValidation";
import { validateCreate } from "../validators/userValidation";
import { productCreate } from "../validators/productValidation";
import { reviewCreate } from "../validators/reviewValidation";

//! PUTS
import updatePassword from "../handlers/users/updatePassword";
router.put("/user/:userId", updatePassword)
router.get("/user/:userId", getUserById)

//* POST
router.post("/product", productCreate, postProduct);
router.post("/user", validateCreate, postUser);
router.post("/category", categoryCreate, postCategory);
router.post("/review", reviewCreate, postReview);

//* GET
router.get("/product", getAllProducts);
router.get("/review", getAllReviews);
router.get("/user", getAllUsers);
router.get("/category", getAllCategories);
router.get("/product/search", getProductByName);
router.get("/product/:id", getProductById);

export default router;

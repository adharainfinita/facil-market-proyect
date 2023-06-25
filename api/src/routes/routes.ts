import { Router } from "express";
const router = Router();

//! Handlers POST
import registerUser from "../handlers/auth/registerUser";
import postCategory from "../handlers/categories/postCategory";
import postReview from "../handlers/reviews/postReview";
import postProduct from "../handlers/products/postProduct";

//! Handlers GET
import getAllProducts from "../handlers/products/getAllProducts";
import getAllCategories from "../handlers/categories/getCategories";
import {
	getAllUsers,
	getUserById,
	getByToken,
} from "../handlers/auth/getUsers";
import getAllReviews from "../handlers/reviews/getReviews";
import getProductByName from "../handlers/products/getProductByName";
import getProductById from "../handlers/products/getProductById";

//! UTILS
import categoryCreate from "../validators/categoryValidation";
//import { validateCreate } from "../validators/userValidation";
//import { productCreate } from "../validators/productValidation";
import { reviewCreate } from "../validators/reviewValidation";
import loginUser from "../handlers/auth/loginUser";
import checkSession from "../Middleware/session";

//* PUTS
import updateUser from "../handlers/auth/updateUser";
import { paymentRouter } from "./payments.routes";
import putProduct from "../handlers/products/updateProduct";
router.put("/user/:userId", updateUser);
router.put("/product/:id", putProduct);

//* rutas auth
router.post("/register", registerUser);
router.post("/login", loginUser);

//* POST
router.post("/product", checkSession, postProduct);
router.post("/category", categoryCreate, postCategory);
router.post("/review", reviewCreate, postReview);

//* Rutas de Compras
router.use("/product", paymentRouter);

//* GET
router.get("/product", getAllProducts);
router.get("/review", getAllReviews);
router.get("/user", getAllUsers);
router.get("/user/:userId", getUserById);
router.get("/category", getAllCategories);
router.get("/product/search", getProductByName);
router.get("/product/:id", getProductById);
router.get("/token", checkSession, getByToken);

export default router;

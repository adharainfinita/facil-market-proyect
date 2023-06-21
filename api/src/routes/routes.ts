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
import getAllUsers from "../handlers/users/getUsers";
import getAllReviews from "../handlers/reviews/getReviews";
import getProductByName from "../handlers/products/getProductByName";
import getProductById from "../handlers/products/getProductById";

//! UTILS
import categoryCreate from "../validators/categoryValidation";
import { validateCreate } from "../validators/userValidation";
import { productCreate } from "../validators/productValidation";
import { reviewCreate } from "../validators/reviewValidation";
import postOrder from "../handlers/payments/postOrder";
import { receivedWebhook } from "../handlers/payments/webhook";


//* POST
router.post("/product", productCreate, postProduct);
router.post("/user", validateCreate, postUser);
router.post("/category", categoryCreate, postCategory);
router.post("/review", reviewCreate, postReview);

//* POST - Compras
router.post("/product/payment", postOrder)
router.get("/product/payment/success", (req, res)=>res.send('success'));
router.get("/product/payment/failure", (req, res)=>res.send('failure'));
router.get("/product/payment/pending", (req, res)=>res.send('pending'));
router.post("product/payment/webhook", receivedWebhook);




//* GET
router.get("/product", getAllProducts);
router.get("/review", getAllReviews);
router.get("/user", getAllUsers);
router.get("/category", getAllCategories);
router.get("/product/search", getProductByName);
router.get("/product/:id", getProductById);

export default router;

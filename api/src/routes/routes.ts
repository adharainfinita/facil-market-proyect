import { Router } from "express";
/* import { login } from "../controllers/login";
import { logout } from "../controllers/logout"; */

const router = Router();

//! Handlers POST
/* import postUser from "../handlers/users/postUser"; */
import postCategory from "../handlers/categories/postCategory";
import postReview from "../handlers/reviews/postReview";
import postProduct from "../handlers/products/postProduct";

//! Handlers GET
import getAllProducts from "../handlers/products/getAllProducts";
import getAllCategories from "../handlers/categories/getCategories";
/* import getAllUsers from "../handlers/users/getUsers"; */
import getAllReviews from "../handlers/reviews/getReviews";
import getProductByName from "../handlers/products/getProductByName";
import getProductById from "../handlers/products/getProductById";

//! UTILS
import categoryCreate from "../validators/categoryValidation";
/* import { validateCreate } from "../validators/userValidation"; */
import { productCreate } from "../validators/productValidation";
import { reviewCreate } from "../validators/reviewValidation";


//* POST
router.post("/product", productCreate, postProduct);
/* router.post("/user", postUser); */
router.post("/category", categoryCreate, postCategory);
router.post("/review", reviewCreate, postReview);
/* router.post("/login", login); */

//* GET
router.get("/product", getAllProducts);
router.get("/review", getAllReviews);
/* router.get("/user", requiresAuth, getAllUsers); */
router.get("/category", getAllCategories);
router.get("/product/search", getProductByName);
router.get("/product/:id", getProductById);
/* router.get("/logout", logout); */

/* router.get("/protected", jwtCheck, (req: Request, res: Response) => {
  // Acceso permitido solo si el token es válido
  // Realiza las acciones necesarias para la ruta protegida
}); */

export default router;

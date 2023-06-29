import { Router } from "express";
const router = Router();

//! Handlers POST

import postPurchase from "../handlers/purchases/postPurchase";

//! Handlers GET
import getUserPurchases from "../handlers/purchases/getUserPurchases";

//! UTILS
import { purchaseCreate } from "../validators/purchaseValidator";

//* POST

router.post("/purchase", purchaseCreate, postPurchase);

//* Rutas de Compras

//* GET
router.get("/purchases/:id", getUserPurchases);

export default router;

import { Router } from "express";
const purchase = Router();

//! Handlers POST

import postPurchase from "../handlers/purchases/postPurchase";

//! Handlers GET
import getUserPurchases from "../handlers/purchases/getUserPurchases";
import getPurchase from "../handlers/purchases/getPurchaseById";

//! UTILS
import { purchaseCreate } from "../validators/purchaseValidator";

//* POST

purchase.post("/", purchaseCreate, postPurchase);

//* Rutas de Compras

//* GET
purchase.get("/user/:userId", getUserPurchases);
purchase.get("/:id", getPurchase);

export default purchase;

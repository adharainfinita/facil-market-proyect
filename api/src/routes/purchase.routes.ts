import { Router } from "express";
const purchase = Router();

import postPurchase from "../handlers/purchases/postPurchase";
import getUserPurchases from "../handlers/purchases/getUserPurchases";
import getPurchase from "../handlers/purchases/getPurchaseById";

//! UTILS
import { purchaseCreate } from "../validators/purchaseValidator";

//! routes Create
purchase.post("/", purchaseCreate, postPurchase);

//! routes Update
purchase.get("/user/:userId", getUserPurchases);
purchase.get("/:id", getPurchase);

//! routes Delete

export default purchase;

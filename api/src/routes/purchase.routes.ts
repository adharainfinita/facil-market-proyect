import { Router } from "express";
const purchase = Router();

import postPurchase from "../handlers/purchases/postPurchase";
import getUserPurchases from "../handlers/purchases/getUserPurchases";
import { purchaseCreate } from "../validators/purchaseValidator";

//! routes Create
purchase.post("/", purchaseCreate, postPurchase);

//! routes Read
purchase.get("/:id", getUserPurchases);

//! routes Update

//! routes Delete

export default purchase;

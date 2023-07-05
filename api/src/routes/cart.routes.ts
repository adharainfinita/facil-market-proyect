import { Router } from "express";
import { getAllItems } from "../handlers/cart/getCart";
import { updateItem } from "../handlers/cart/updateCart";
import { addItem } from "../handlers/cart/postCart";
const cart = Router();

//! routes Create
cart.post("/:userID", addItem);

//! routes Read
cart.get("/:userID", getAllItems);

//! routes Update
cart.put("/:userID", updateItem);

//! routes Delete

export default cart;

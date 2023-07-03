import { Router } from "express";
import { getAllItems } from "../handlers/Cart/getCart";
import { updateItem } from "../handlers/Cart/updateCart";
import { addItem } from "../handlers/Cart/postCart";
// import {updateCart} from "../handlers/cart/updateCart"
const cart = Router();

cart.get("/:userID", getAllItems);

cart.post("/:userID", addItem);

// cart.put("/:userId", updateCart)

cart.put("/:id", updateItem);

export default cart;

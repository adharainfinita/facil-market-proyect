import { Router } from "express";
import { getAllItems } from "../handlers/cart/getCart";
import { updateItem } from "../handlers/cart/updateCart";
import { addItem } from "../handlers/cart/postCart";
const cart = Router();

cart.get("/:userID", getAllItems);

cart.post("/:userID", addItem);

cart.put("/:userID", updateItem);

export default cart;

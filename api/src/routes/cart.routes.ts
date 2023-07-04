import { Router } from "express";
import { getAllItems } from "../handlers/Cart/getCart";
import { updateItem } from "../handlers/Cart/updateCart";
import { addItem } from "../handlers/Cart/postCart";
const cart = Router();

cart.get("/:userID", getAllItems);

cart.post("/:userID", addItem);

cart.put("/:userID", updateItem);

export default cart;

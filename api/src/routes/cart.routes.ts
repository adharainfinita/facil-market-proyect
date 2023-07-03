import { Router } from "express";
import {getAllItems} from "../handlers/cart/getCart"
import {updateItem} from "../handlers/cart/updateCart"
import {addItem} from "../handlers/cart/postCart"
// import {updateCart} from "../handlers/cart/updateCart"
const cart = Router();

cart.get("/:userID", getAllItems)

cart.post("/:userID", addItem)

// cart.put("/:userId", updateCart)

cart.put("/:id", updateItem)

export default cart
import { Router } from "express";
import {getAllItems} from "../handlers/cart/getCart"
import {removeItem} from "../handlers/cart/updateCart"
import {addItem} from "../handlers/cart/postCart"
// import {updateCart} from "../handlers/cart/updateCart"
const cart = Router();

cart.get("/:userID", getAllItems)

cart.post("/:userID", addItem)

// cart.put("/:userId", updateCart)

cart.delete("/:id", removeItem)

export default cart
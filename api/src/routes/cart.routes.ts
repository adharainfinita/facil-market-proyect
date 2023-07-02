import { Router } from "express";
import {getAllItems} from "../handlers/cart/getCart"
import {removeItem} from "../handlers/cart/deleteCart"
import {addItem} from "../handlers/cart/postCart"
// import {updateCart} from "../handlers/cart/updateCart"
const cart = Router();

cart.get("/", getAllItems)

cart.post("/:userId", addItem)

// cart.put("/:userId", updateCart)

cart.delete("/:id", removeItem)

export default cart
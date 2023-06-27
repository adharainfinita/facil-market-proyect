import { Router } from "express";
const product = Router();

import postProduct from "../handlers/products/postProduct";
import getAllProducts from "../handlers/products/getAllProducts";
import getProductByName from "../handlers/products/getProductByName";
import getProductById from "../handlers/products/getProductById";
import putProduct from "../handlers/products/updateProduct";
import checkSession from "../Middleware/session";

//! routes Create
product.post("/", checkSession, postProduct);

//! routes Read
product.get("/", getAllProducts);
product.get("/:id", getProductById);
product.get("/search", getProductByName);

//! routes Update
product.put("/:id", putProduct);

//! routes Delete

export default product;

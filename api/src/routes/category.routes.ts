import { Router } from "express";
const category = Router();

import categoryCreate from "../validators/categoryValidation";
import postCategory from "../handlers/categories/postCategory";
import getAllCategories from "../handlers/categories/getCategories";

//! routes Create
category.post("/", categoryCreate, postCategory);

//! routes Read
category.get("/", getAllCategories);

//! routes Update

//! routes Delete

export default category;

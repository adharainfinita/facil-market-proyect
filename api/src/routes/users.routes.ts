import { Router } from "express";
const user = Router();

import { getUserById, getAllUsers } from "../handlers/auth/getUsers";
import updateUser from "../handlers/auth/updateUser";

//! routes Create

//! routes Read
user.get("/", getAllUsers);
user.get("/:userId", getUserById);

//! routes Update
user.put("/:userId", updateUser);

//! routes Delete

export default user;

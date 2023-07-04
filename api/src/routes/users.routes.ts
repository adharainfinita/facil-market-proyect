import { Router } from "express";
const user = Router();

import { getUserById, getAllUsers } from "../handlers/auth/getUsers";
import updateUser from "../handlers/auth/updateUser";
import deleteUser from "../handlers/auth/deleteUser";

//! routes Create

//! routes Read
user.get("/", getAllUsers);
user.get("/:userId", getUserById);

//! routes Update
user.put("/:userId", updateUser);

//! routes Delete
user.put("/delete/:userId", deleteUser);

export default user;

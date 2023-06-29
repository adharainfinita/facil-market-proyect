import { Router } from "express";
const auth = Router();

import { getByToken } from "../handlers/auth/getUsers";
import checkSession from "../Middleware/session";
import loginUser from "../handlers/auth/loginUser";
import registerUser from "../handlers/auth/registerUser";

//! routes Create
auth.post("/register", registerUser);
auth.post("/login", loginUser);

//! routes Read
auth.get("/token", checkSession, getByToken);

//! routes Update

//! routes Delete

export default auth;

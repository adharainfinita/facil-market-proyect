import { Router } from "express";
const admin = Router();
import getBasicData from "../handlers/admin/getBasicData";
import getData from "../handlers/admin/getData";

//! routes Create

//! routes Read
admin.get("/", getBasicData);
admin.get("/analytics", getData);

//! routes Update

//! routes Delete

export default admin;

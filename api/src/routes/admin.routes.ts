import { Router } from "express";
const admin = Router();
// const data = require('../utils/database.json');
import getBasicData from "../handlers/admin/getBasicData";
import getData from "../handlers/admin/getData";


admin.get('/', getBasicData);
admin.get('/analytics', getData);

export default admin;
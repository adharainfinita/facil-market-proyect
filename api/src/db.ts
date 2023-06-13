import Users from "./models/User";
import Reviews from "./models/Reviews";
import Categories from "./models/Category";
import Products from "./models/Product";
import { Sequelize } from "sequelize-typescript";
import ProductCategories from "./models/relations/ProductCategories";

import dotenv from 'dotenv';

dotenv.config();

const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;


if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
    throw new Error("Falta alguna variable de entorno requerida");
  }


  
const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
        {
            host: DB_HOST,
            port: Number(DB_PORT),
            dialect: 'postgres',
            models: [Products,Categories, ProductCategories, Reviews, Users],
        logging: false,
        native: false,
    },
    ) 



    export default database
import Category from "../models/Category";
import Product from "../models/Product";
import Review from "../models/Review";
import User from "../models/User";


export const findAllCategories = async() => await Category.findAll();

export const findAllProducts = async () => await Product.findAll();

export const findAllUsers = async() => await User.findAll();

export const findAllReviews = async() => await Review.findAll();

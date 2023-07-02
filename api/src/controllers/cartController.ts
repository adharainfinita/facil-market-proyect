import Cart from "../models/Cart";

export const createCart = async(userID: number, products: Array<number> ) => {

  return await Cart.create({
    userID: userID,
    productID: products
  })
}
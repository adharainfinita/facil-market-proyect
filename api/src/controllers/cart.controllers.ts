import { cartProductProps } from "../interfaces/propsModel";
import Cart from "../models/Cart";
import Product from "../models/Product";

export const createCart = async(userID: number, products: Array<number> ) => {



  const response = await Cart.create({
    userID: userID,
    productID: products
  })

  return response;
  
}

export const getCartById = async ( userID: number ) => {

 const myCart = await Cart.findOne({
    where: {
      userID: userID
    }
  })
  if(!myCart) throw Error('No existe el usuario');
  
  let count = 0;
  const productsCart: cartProductProps = {
    id: myCart!.id,
    userID: myCart!.userID,
    productID: []
  }

while(myCart?.productID!.length !== count){
  const productFound = await Product.findByPk(myCart?.productID![count]);
  if(productFound){
    productsCart.productID.push(productFound)
    count++;
  }
  else throw Error(`No existe producto con ID: ${myCart?.productID![count]}`)
}
 
return productsCart;
  
}

export const changeItemsCart = async (id: number, cart:cartProductProps ) => {

  const myCart= await Cart.findByPk(id);

  myCart?.update(cart);

  return myCart;
}
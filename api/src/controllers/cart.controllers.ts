import { cartProductProps } from "../interfaces/propsModel";
import Cart from "../models/Cart";
import Product from "../models/Product";

export const createCart = async (userID: number) => {
    console.log(`userID: ${userID} `);

    const cartFound = await Cart.findOne({
        where: { userID: userID },
    });

    if (cartFound?.dataValues.id) {
        return "ya existe el carrito";
    }

    const response = await Cart.create({
        userID: userID,
        productID: [],
    });

    return response;
};

export const getCartById = async (userID: number) => {
    const myCart = await Cart.findOne({
        where: {
            userID: userID,
        },
    });

    if (!myCart) throw Error("No existe el usuario");

    const productsCart: cartProductProps = {
        id: myCart!.id,
        userID: myCart!.userID,
        productID: [],
    };

    let count = 0;
    if(!myCart.productID?.length) return myCart;
    while (myCart?.productID?.length !== count) {
        const productFound = await Product.findByPk(myCart?.productID![count]);
        if (productFound) {
            productsCart.productID.push({
                id: productFound.id,
                name: productFound.name,
                price: productFound.price,
                categoryID: productFound.categoryID,
                image: productFound.images[0],
                quantity: 1,
            });
            count++;
        } else
            throw Error(`No existe producto con ID: ${myCart?.productID![count]}`);
    }

    return productsCart;
};

export const changeItemsCart = async (
    userID: number,
    productID: Array<number>
) => {
    const myCart = await Cart.findOne({ where: { userID: userID } });

    await myCart?.update({ productID: productID });


    return myCart;
};
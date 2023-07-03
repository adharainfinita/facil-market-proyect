import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { BuyProduct, Product } from "../../utils/interfaces";
import { BuyProduct, Product } from "../../utils/interfaces";
import PaymentButton from "../../components/PaymentButton";

// import { UpdateCart } from "../../services/cartServicer";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
 
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems.products
  );
  const products = useSelector((state: RootState) => state.product.products);

  const cartPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const [productsCart, setProductsCart] = useState<Product[]>([]);

	console.log(productsCart);

  //? logica de compra
  const handleTotalPrice = (cartItems: any[]) => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.cartQuantity,
      0
    );

		return totalPrice;
	};

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    // Cargar productos al backend cuando se accede a la página

    const getProductsCart = () => {
      let count = 0;
      while (cartItems.length !== count) {
        const productFound = products.find(
          (match) => match.id === cartItems[count]
        );
        if(productFound){
          setProductsCart(
          [...productsCart, productFound]
        );
        count++;
        }
      }
    };
    getProductsCart();
  }, [cartItems, products, productsCart]);

  return (
    <div>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <h1 className="cart-title">Carrito de compras</h1>
          <button onClick={handleClearCart}>Limpiar carrito</button>
          <div className="cards-container">
            {productsCart.map((item: Product, index: number) => (
              <CartItem key={index} item={item} index={index} />
            ))}
          </div>

          <div className="cartTotal-container">
            <h2 className="cart__total">
              Precio Final: $
              {cartPrice?.toLocaleString("es-AR", {
                minimumFractionDigits: 0,
              })}
            </h2>
          </div>
          <PaymentButton product={productsCart} />
        </>
      )}
    </div>
  );
};

export default Cart;


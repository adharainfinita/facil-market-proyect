import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import { Product } from "../../utils/interfaces";
import PaymentButton from "../../components/PaymentButton";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <h1 className="cart-title">Carrito de compras</h1>
          <button onClick={handleClearCart}>Limpiar carrito</button>
          <div className="cards-container">
            {cartItems.map((item: Product, index: number) => (
              <CartItem item={item} index={index} />
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
          <PaymentButton product={cartItems[0]} />
        </>
      )}
    </div>
  );
};

export default Cart;

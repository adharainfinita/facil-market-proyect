import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import { Product } from "../../utils/interfaces";
import PaymentButton from "../../components/PaymentButton";
import { updateItem } from "../../services/cartServicer";

// import { UpdateCart } from "../../services/cartServicer";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const userLoginId = useSelector((state: RootState) => state.user.userLogin.user.id);
  const cartItems = useSelector((state: RootState) =>
    state.cart.cartItems.filter((item: Product) => item.userID === userLoginId)
  );
  const cartPrice = useSelector((state: RootState) => state.cart.totalPrice);


  const updateCartItems = async (userId: number, products: any[]) => {
    try {
      await updateCartItems(userId, products);
      console.log('Carrito de compras actualizado exitosamente');
    } catch (error) {
      console.error('Ocurrió un error al actualizar el carrito de compras:', error);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  

  useEffect(() => {
    // Cargar productos al backend cuando se accede a la página
    const userId = userLoginId;
    const products = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      images: item.images
    }));

    updateCartItems(Number(userId), products);
  }, [cartItems]);



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
          <PaymentButton product={cartItems[0]} />
        </>
      )}
    </div>
  );
};

export default Cart;

import { useDispatch } from "react-redux";
import { Product } from "../../utils/interfaces";
import { removeFromCart } from "../../redux/features/cartSlice";

interface CartItemProps {
  item: Product
  index: number
}

const CartItem = ({item, index}: CartItemProps) => {
  const dispatch = useDispatch()

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div key={index} className="item-card">
      <button
        className="cart_delete"
        onClick={() => handleRemoveFromCart(item)}
      >
        X
      </button>
      <img width={100} src={item.images[0]} alt={item.name} />
      <div className="item-details">
        <div>
          <p>Categoría: {item.categoryName}</p>
          <p>Nombre: {item.name}</p>
        </div>
        <div>
          <p>
            Precio: $
            {item.price.toLocaleString("es-AR", {
              minimumFractionDigits: 0,
            })}
          </p>
          <p>Ubicación: {item.location}</p>
        </div>
        <div>
          <p>Cantidad: {item.cartQuantity}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

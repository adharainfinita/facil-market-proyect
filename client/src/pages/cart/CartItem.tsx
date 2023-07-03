import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../utils/interfaces";
import { removeFromCart } from "../../redux/features/cartSlice";
import { updateItem } from "../../services/cartServicer";
import {RootState} from '../../redux/store'

interface CartItemProps {
  item: Product
  index: number
  quantities: number
}

const CartItem = ({item, index, quantities}: CartItemProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userLogin.user)
  const items = useSelector((state: RootState) => state.cart.cartItems.products)
  console.log(items)
  const handleRemoveFromCart = async(item: Product) => {
      dispatch(removeFromCart(item.id));
      await updateItem( Number(user.id), items)
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
          {/* <p>Categoría: {item.categoryName}</p> */}
          <p>Nombre: {item.name}</p>
        </div>
        <div>
          <p>
            Precio: $
            {item.price.toLocaleString("es-AR", {
              minimumFractionDigits: 0,
            })}
          </p>
          {/* <p>Ubicación: {item.location}</p> */}
        </div>
        <div>
        <p>Cantidad: {quantities}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
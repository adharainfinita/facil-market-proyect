import { Link } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";
import empty_cart_logo from "../../assets/empty_cart.svg";

const CartEmpty = () => {
  return (
    <div className="cart-empty">
      <img
				width={300}
        className="cart-empty-img"
        src={empty_cart_logo}
        alt="empty cart logo"
      />
      <h2 className="cart-empty-title">Tu carrito está vacío</h2>
      <span>Comenzá a llenarlo con nuestro productos.</span>
      <Link to="/products">
        <p>
          <TiArrowLeft className="arrowLeft" /> Ir de compras
        </p>
      </Link>
    </div>
  );
};

export default CartEmpty;

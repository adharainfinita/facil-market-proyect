import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/features/cartSlice";
import { updateItem } from "../../services/cartServicer";
import { RootState } from "../../redux/store";
import { BuyProduct } from "../../utils/interfaces";
import {
	incrementQuantity,
	decrementQuantity,
} from "../../redux/features/cartSlice";
interface CartItemProps {
	item: BuyProduct;
	index: number;
<<<<<<< HEAD

=======
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
}
import { Link } from "react-router-dom";

const CartItem = ({ item, index }: CartItemProps) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user.userLogin.user);
	const product = useSelector((state:RootState)=> state.product.products)
	const items = useSelector(
		(state: RootState) => state.cart.cartItems.productID
	);
	const product = useSelector((state:RootState)=> state.product.products)
	const productFound = product.find( match => match.id === item.id)

<<<<<<< HEAD
	// const product: any = {
	// 	data: [...products],
	// };

	// console.log(product);
	const productFound = product.find( match => match.id === item.id)
=======
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf

	const handleRemoveFromCart = async (item: BuyProduct) => {
		const arrayID = items.map((item: BuyProduct) => {
			return {
				productId: item.id,
				quantity: item.quantity,
			};
		});
		dispatch(removeFromCart(item.id));
		await updateItem(Number(user.id), arrayID);
	};

	const handleIncrementQuantity = () => {
<<<<<<< HEAD
			dispatch(incrementQuantity(item.id));
		
		// product.data[index].unities = product.data[index].unities - 1;
=======
		dispatch(incrementQuantity(item.id));
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
	};

	const handleDecrementQuantity = () => {
		dispatch(decrementQuantity(item.id));
	};

	return (
		<div key={index} className="cart-detail-container">
			<div className="cart-image-container">
				<Link to={`/product/detail/${item.id}`}>
					<img className="cart-detail-image" src={item.image} alt={item.name} />
				</Link>
			</div>

			<div className="cart-detail-div-section">
				<section className="cart-detail-section">
					<h4>Nombre</h4>
					<p>{item.name}</p>
				</section>

				<section className="cart-detail-section">
					<h4>Precio</h4>
					<p>${item.price * item.quantity}</p>
				</section>

				<section className="cart-detail-section">
					<h4>Cantidad</h4>
					<div className="cart-detail-quantity">
						<button
							onClick={handleDecrementQuantity}
							className="cart-detail-btn-quantity"
						>
							-
						</button>
						<p>{item.quantity}</p>
						<button
							onClick={handleIncrementQuantity}
							disabled={productFound!.unities > item.quantity ? false : true}
							className="cart-detail-btn-quantity"
<<<<<<< HEAD
							// disabled={product.data[index]?.unities === 0 ? true : false}
=======
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
						>
							+
						</button>
					</div>
				</section>
				<button
					className="cart-detail-btn"
					onClick={() => handleRemoveFromCart(item)}
				>
					X
				</button>
			</div>
		</div>
	);
};

export default CartItem;

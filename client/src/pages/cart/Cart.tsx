import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { BuyProduct, Product } from "../../utils/interfaces";
import PaymentButton from "../../components/PaymentButton";
import { clearCart } from "../../redux/features/cartSlice";
import { updateItem } from "../../services/cartServicer";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";

const Cart = () => {
	const dispatch = useDispatch();

	const cartItems = useSelector(
		(state: RootState) => state.cart.cartItems.productID
	);

	const userID = useSelector(
		(state: RootState) => state.user.userLogin.user.id
	);

	useEffect(() => {
		const arrayId = cartItems.map((item) => {
			return {
				productId: item.id,
				quantity: item.quantity,
			};
		});

		const fetchData = async () => {
			try {
				const response = await updateItem(Number(userID), arrayId);
				return response;
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [cartItems, userID]);

	const products = useSelector((state: RootState) => state.product.products);
	const [_productsCart, setProductsCart] = useState<BuyProduct[]>([]);

	//? logica de compra
	const handleTotalPrice = (cartItems: Array<BuyProduct>) => {
		const totalPrice = cartItems?.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);

		return totalPrice;
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};
	useEffect(() => {
		const getProductsCart = () => {
			const tempProductsCart: Product[] = []; // Array temporal para almacenar los productos

			for (const cartItem of cartItems) {
				const productFound = products.find(
					(product) => product.id === cartItem.id
				);
				if (productFound) {
					tempProductsCart.push(productFound);
				}
			}

			setProductsCart(cartItems);
		};

		getProductsCart();
	}, [cartItems, products]);

	useEffect(() => {
		const arrayId = cartItems.map((item) => {
			return {
				productId: item.id,
				quantity: item.quantity,
			};
		});

		const fetchData = async () => {
			try {
				const response = await updateItem(Number(userID), arrayId);
				return response;
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [cartItems, userID]);

	return (
		<div className="cart-conteiner">
			{cartItems?.length === 0 ? (
				<CartEmpty />
			) : (
				<div className="cart-conteiner">
					<section className="cart-section">
						<h1 className="cart-title">Carrito de compras</h1>
						<button onClick={handleClearCart} className="cart__clear">
							Limpiar carrito
						</button>
					</section>

					{cartItems?.map((item: BuyProduct, index: number) => (
						<CartItem key={index} item={item} index={index} />
					))}

					<section className="cart-section">
						<h2 className="cart__total">
							{`Precio Final: ${handleTotalPrice(cartItems)}`}
						</h2>
						<PaymentButton {...cartItems} />
					</section>
				</div>
			)}
		</div>
	);
};

export default Cart;

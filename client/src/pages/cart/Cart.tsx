import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { BuyProduct, Product } from "../../utils/interfaces";
import PaymentButton from "../../components/PaymentButton";
import { clearCart } from "../../redux/features/cartSlice";
import { getAllItems } from "../../services/cartServicer";
// import { UpdateCart } from "../../services/cartServicer";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";
import { startCart } from "../../redux/features/cartSlice";

const Cart = () => {
	const dispatch = useDispatch();

	const cartItems = useSelector(
		(state: RootState) => state.cart.cartItems.products
	);
	console.log(cartItems)
	const [quantities, setQuantitiees] = useState<number[]>([]);
	const products = useSelector((state: RootState) => state.product.products);
	const [productsCart, setProductsCart] = useState<Product[]>([]);
	const currentUser = useSelector((state: RootState) => state.user.userLogin.user.id);

	/* console.log(productsCart); */

	//? logica de compra
	const handleTotalPrice = (cartItems: Array<BuyProduct>) => {
		const totalPrice = cartItems.reduce(
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
			const tempQuantiries = [];

			for (const cartItem of cartItems) {
				const productFound = products.find(
					(product) => product.id === cartItem.id
				);
				if (productFound) {
					tempProductsCart.push(productFound);
					tempQuantiries.push(cartItem.quantity);
				}
			}

			setProductsCart(tempProductsCart);
			setQuantitiees(tempQuantiries);
		};

		getProductsCart();

	}, [cartItems, products]);

	/* useEffect (() => {
		const fetchItems = async () => {
			try {
				const response = await getAllItems(Number(currentUser));
				if (response) {
					dispatch(startCart(response));
				} else {
					console.error("No existen items");
				}
			} catch (error) {
				console.error("Error al obtener las items:", error);
			}
		};
		fetchItems();
	}, [dispatch]) */
	// useEffect(() => {
	// 	// Cargar productos al backend cuando se accede a la página

	// 	const getProductsCart = () => {
	// 		let count = 0;
	// 		while (cartItems?.length !== count) {
	// 			const productFound = products.find(
	// 				(match) => match.id === cartItems[count].id
	// 			);
	// 			if (productFound) {
	// 				setProductsCart([...productsCart, productFound]);
	// 			}
	//       count++;
	// 		}
	// 	};
	// 	getProductsCart();
	// }, [cartItems, products]);

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
							<CartItem
								key={index}
								item={item}
								quantities={quantities[index]}
								index={index}
							/>
						))}
					</div>

					<div className="cartTotal-container">
						<h2 className="cart__total">
							{`Precio Final: ${handleTotalPrice(cartItems)}`}
						</h2>
					</div>
					<PaymentButton {...cartItems} />
				</>
			)}
		</div>
	);
};

export default Cart;

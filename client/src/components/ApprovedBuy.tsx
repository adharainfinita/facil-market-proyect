import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserPurchase } from "../services/purchaseServices";
import { RootState } from "../redux/store";
import { BuyProduct, Product } from "../utils/interfaces";
import { clearCart } from "../redux/features/cartSlice";
import logo from "../assets/marketplace_logo.png";

const ApprovedBuy = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state: RootState) => state.user.userLogin);
	const cartItems = useSelector((state: RootState) => state.cart.cartItems);
	const products = useSelector((state: RootState) => state.product.products);
	const [error, setError] = useState<string>("");
	const [_productsCart, setProductsCart] = useState<BuyProduct[]>([]);

	useEffect(() => {
		const getProductsCart = () => {
			const tempProductsCart: Product[] = [];

			for (const cartItem of cartItems.productID) {
				const productFound = products.find(
					(product) => product.id === cartItem.id
				);
				if (productFound) {
					tempProductsCart.push(productFound);
				}
			}

			setProductsCart(cartItems.productID);
		};
		getProductsCart();
	}, [cartItems, products]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const paymentId = urlParams.get("payment_id");

		const postPurchase = async () => {
			try {
				const info = {
					userId: Number(currentUser.user.id),
					products: _productsCart,
					paymentId: Number(paymentId),
				};
				if (info.userId !== 0) {
					const responsePurchase = await postUserPurchase(info);
					dispatch(clearCart());
					return responsePurchase;
				}
			} catch (error: any) {
				setError(error);
			}
		};

		postPurchase();
	}, [_productsCart, dispatch]);

	return (
		<div className="container_approved">
			<img src={logo} alt="logo" className="logo-approved" />
			<h1 className="title-approved">Tu compra fue Aprobada!</h1>
			<Link to="/products">
				<button className="buttom-approved">Seguir Comprando</button>
			</Link>
			<p className="text-approved">{error}</p>
		</div>
	);
};

export default ApprovedBuy;

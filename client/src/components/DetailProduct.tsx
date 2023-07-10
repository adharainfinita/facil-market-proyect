import { useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Reviews from "./Review";
import { BuyProduct } from "../utils/interfaces";
import { RootState } from "../redux/store";
import { addToCart } from "../redux/features/cartSlice";
import useProduct from "../hooks/useProduct";
import { updateItem } from "../services/cartServicer";
import swal from 'sweetalert';

const DetailProduct = () => {
	const navigate = useNavigate();
	const product = useProduct();
	const currentUser = useSelector((state: RootState) => state.user.userLogin);
	const items = useSelector(
		(state: RootState) => state.cart.cartItems.productID
	);
	const [goCart, setGoCart] = useState(false)
	
	const session = useSelector((state: RootState) => state.user.userValidation);

	const [selectedImage, setSelectedImage] = useState<string>("");
	const [stock, setStock] = useState<number>(1);

	const dispatch = useDispatch();

	const data: BuyProduct = {
		id: product.id,
		name: product.name,
		price: product.price,
		image: product.images[0],
		quantity: stock,
	};

	const goToCart = ()=>{
		navigate('/cart')
	}

	const handleAddToCart = async (_userID: number, data: BuyProduct) => {
		if (currentUser.user.id === product.userID) {
			// Si el userID coincide con el product.userID, el vendedor no puede comprar su propio producto
			swal('Atención!',"No puedes agregar al carrito tu mismo producto.", 'warning');
		} else {
			dispatch(addToCart(data));
			const before = items.map((item) => {
				return {
					productId: item.id,
					quantity: item.quantity
				}})
			const current = [{productId: data.id, quantity: data.quantity}]
			const arrayId = before.concat(current)
			try {
				const response = await updateItem(Number(_userID), arrayId);
				setGoCart(true)
				return response;
			} catch (error) {
				swal('😣', 'error', 'error');
			}
		}
	};

	useEffect(() => {
		if (product?.images.length > 0 && !selectedImage) {
			setSelectedImage(product.images[0]);
		}
	}, [product, selectedImage]);

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	const handleStockChange = (action: string) => {
		if (action === "increment") {
			setStock(stock + 1);
		} else {
			setStock(stock - 1);
		}
	};

	

	const renderSesion = () => {
		return (
			<div>
				<h3>Inicia sessión para comprar un producto</h3>
				<Link to="/login">¿Deseas iniciar sessión?</Link>
				<h3>¿No tienes una cuenta?</h3>
				<Link to="/register">Registarme</Link>
			</div>
		);
	};

	const renderConditional = () => {
		return (
			<>
				{session ? (
					<section className="detail-product-section">
						<button
							className="detail__product_quantity"
							disabled={stock === 1 && session ? true : false}
							onClick={() => handleStockChange("decrement")}
						>
							{" "}
							-{" "}
						</button>
						<h3>{stock}</h3>
						<button
							className="detail__product_quantity"
							disabled={stock === product.unities && session ? true : false}
							onClick={() => handleStockChange("increment")}
						>
							{" "}
							+{" "}
						</button>
					</section>
				) : (
					""
				)}

				<div>
					{session ? (
	
						<button
							className="detail-product-button"
							onClick={() => !goCart ?
								handleAddToCart(Number(currentUser.user.id), data)
								: goToCart()
							}
						>
							{goCart ? "Ir al carrito" : "Agregar al carrito "}
						</button>
					) : (
						renderSesion()
					)}
				</div>
			</>
		);
	};

	return (
		<div className="detail-product-container">
			<div className="detail-product">
				<div className="conteiner-pre-image">
					{product.images.map((img: string, index: number) => (
						<div
							key={index}
							className="pre-image"
							onClick={() => handleImageClick(img)}
						>
							{img ? (
								<img className="preview-image" src={img} alt="preview images" />
							) : (
								<BsCardImage className="react-icon" />
							)}
						</div>
					))}
				</div>

				<div className="detail-product-image">
					<img src={selectedImage} alt={product.name} />
				</div>

				<div className="conteiner-info">
					<div className="detail-product-info">
						<div className="conteiner-name-price">
							<h1 className="detail-product-name">{product.name}</h1>
							<h1 className="detail-product-price">
								$
								{product.price.toLocaleString("es-AR", {
									minimumFractionDigits: 0,
								})}
							</h1>
						</div>
						<section className="detail-product-section">
							<h2>Categoria:</h2>
							<h3>{product.categoryName}</h3>
						</section>
						<section className="detail-product-section">
							<h2>Estrellas:</h2>
							<h3>{product.rating}⭐</h3>
						</section>

						<section className="detail-product-section">
							<div className="container-description">
								<h2>Descripción:</h2>
								<p className="detail-product-description">
									{product.description}
								</p>
							</div>
						</section>
					</div>
					<div className="review__cont">
						<Reviews></Reviews>
					</div>
				</div>

				<div className="detail-product-sales">
					<h2>Informacion sobre el vendedor</h2>
					<section className="detail-product-section">
						<h2>Vendedor:</h2>
						<Link to={`/profile/${product.userID}`}>
							<h3>{product.userName}</h3>
						</Link>
					</section>

					<section className="detail-product-section">
						<h2>Ubicación:</h2>
						<h3>{product.location}</h3>
					</section>
					<section className="detail-product-section">
						<h2>Estado:</h2>
						<h3>{product.status}</h3>
					</section>
					<section className="detail-product-section">
						<h2>Stock:</h2>
						<h3>{product.stock}</h3>
					</section>
					<section className="detail-product-section">
						<h2>Unidades:</h2>
						<h3>{product.unities <= 0 ? "Agotado" : product.unities}</h3>
					</section>

					{product.unities <= 0 ? null : renderConditional()}
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;

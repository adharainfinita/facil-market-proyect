import { useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Reviews from "./Review";
import { BuyProduct } from "../utils/interfaces";
import { RootState } from "../redux/store";
//import { updateUnities } from "../redux/features/productSlice";
//import { updateStock } from "../services/productServices";
import { addToCart } from "../redux/features/cartSlice";
import useProduct from "../hooks/useProduct";
import { updateItem } from "../services/cartServicer";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DetailProduct = () => {
	const product = useProduct();
	const currentUser = useSelector((state: RootState) => state.user.userLogin);
	const items = useSelector(
		(state: RootState) => state.cart.cartItems.productID
	);
	const [selectedImage, setSelectedImage] = useState<string>("");
	const [stock, setStock] = useState<number>(1);

	const [storage, setStorage] = useLocalStorage("product", {});
	const [globalStorage, setGlobalStorage] = useLocalStorage("products", {
		products: [],
	});
	const dispatch = useDispatch();

	const data: BuyProduct = {
		id: product.id,
		name: product.name,
		price: product.price,
		image: product.images[0],
		quantity: stock,
	};

	const foundProduct = () => {
		const updatedProducts = globalStorage.products.map((item: any) => {
			if (item.id === storage.id) {
				return {
					...item,
					unities: storage.unities, 
				};
			}
			return item;
		});

		const foundIndex = updatedProducts.findIndex(
			(item: any) => item.id === storage.id
		);
		if (foundIndex === -1) {
			updatedProducts.push(storage);
		}

		return updatedProducts;
	};

	const handleAddToCart = async (_userID: number, data: BuyProduct) => {
		const updatedGlobalStorage = {
			...globalStorage,
			products: foundProduct(),
		};
		setGlobalStorage(updatedGlobalStorage);
		dispatch(addToCart(data));
	};

	useEffect(() => {
		if (product?.images.length > 0 && !selectedImage) {
			setSelectedImage(product.images[0]);
		}
		setStorage({ ...product, unities: product.unities - 1 });
	}, [product, selectedImage]);

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	const handleStockChange = (action: string) => {
		if (action === "increment") {
			setStorage({ ...storage, unities: storage.unities - 1 });
			setStock(stock + 1);
		} else if (action === "decrement") {
			setStorage({ ...storage, unities: storage.unities + 1 });
			setStock(stock - 1);
		}
	};

	useEffect(() => {
		const fetchInfo = async () => {
			const arrayID = items.map((item: BuyProduct) => {
				return {
					productId: item.id,
					quantity: item.quantity,
				};
			});

			await updateItem(Number(currentUser.user.id), arrayID);
		};

		fetchInfo();
	}, [currentUser, product]);

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
						<h3>{storage.unities}</h3>
					</section>

					<section className="detail-product-section">
						<button
							className="detail__product_quantity"
							disabled={storage.unities < product.unities - 1 ? false : true}
							onClick={() => handleStockChange("decrement")}
						>
							{" "}
							-{" "}
						</button>
						<h3>{stock}</h3>
						<button
							className="detail__product_quantity"
							disabled={storage.unities === 0 ? true : false}
							onClick={() => handleStockChange("increment")}
						>
							{" "}
							+{" "}
						</button>
					</section>

					<div>
						<button
							className="detail-product-button"
							onClick={() => handleAddToCart(Number(currentUser.user.id), data)}
						>
							Agregar al carrito
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;

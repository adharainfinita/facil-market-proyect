import useProduct from "../hooks/useProduct";
import { BsCardImage } from "react-icons/bs";
import { PaymentButton } from "./PaymentButton";
import { useEffect, useState } from "react";
import { NotificationType } from "../utils/interfaces";
import RatingStars from "./ReviewStar";
import { useDispatch } from "react-redux";
import { updateRating } from "../redux/features/productSlice";
import { updateProduct } from "../services/productServices";

const DetailProduct = () => {
	const product = useProduct();
	const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = useState<string>("");
	const [_rating, setRating] = useState(0);
	const [notification, setNotification] = useState<NotificationType>({
		isOpen: false,
		type: null,
		content: "",
	});

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const status = urlParams.get("status");

		if (status === "approved") {
			setNotification({
				content: "Pago aprobado😎",
				isOpen: true,
				type: "approved",
			});
		}

		if (status === "failure") {
			setNotification({
				content: "Pago rechazado😢",
				isOpen: true,
				type: "failure",
			});
		}
	}, []);

	useEffect(() => {
		if (product?.images.length > 0 && !selectedImage) {
			setSelectedImage(product.images[0]);
		}
	}, [product, selectedImage]);

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	const handleRatingChange = async (newRating: number) => {
		dispatch(updateRating(newRating));
		setRating(newRating);
		// Actualizar el objeto `product` si es necesario
		/* 	console.log(product.id, newRating); */

		/* const response =  */ await updateProduct(product);
		// Aplicar los cambios al objeto `product` (puedes enviar la actualización al servidor o actualizar el estado global si es necesario)
		/* 	console.log("Nueva calificación:", response.rating); */
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
					<div className="conteiner-name-price">
						<h1 className="detail-product-name">{product.name}</h1>
						<h1 className="detail-product-price">
							$
							{product.price.toLocaleString("es-AR", {
								minimumFractionDigits: 0,
							})}
						</h1>
					</div>

					<div className="detail-product-info">
						<section className="detail-product-section">
							<h2>Categoria:</h2>
							<h3>{product.categoryName}</h3>
						</section>

						<section className="detail-product-section">
							<h2>Reseñas:</h2>
							<h3>{product.rating}</h3>
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
				</div>

				<div className="detail-product-sales">
					<h2>Informacion sobre el vendedor</h2>
					<section className="detail-product-section">
						<h2>Vendedor:</h2>
						<h3>{product.userName}</h3>
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
						<h2>Unidades:</h2>
						<h3>{product.stock}</h3>
					</section>
					<div className=".detail-product-button">
						<PaymentButton product={product} />
					</div>

					<div>
						<section className="detail-product-section">
							<h2>Reseñas:</h2>
							<RatingStars
								rating={product.rating}
								onRatingChange={handleRatingChange}
							/>
						</section>
					</div>

					{notification.isOpen && <div>{notification.content}</div>}
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;

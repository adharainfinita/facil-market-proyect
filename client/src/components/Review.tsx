import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useProduct from "../hooks/useProduct";
import RatingStars from "./ReviewStar";
import { updateRating } from "../redux/features/productSlice";
import { updateProduct } from "../services/productServices";
import {
	createReview,
	getAllReviewsProduct,
	deleteReview,
} from "../services/reviewService";
import { RootState } from "../redux/store";
import { Purchase, Review } from "../utils/interfaces";
import { Link } from "react-router-dom";
import { getPurchasesByUser } from "../services/purchaseServices";
<<<<<<< HEAD
import swal from 'sweetalert'
=======
import swal from "sweetalert";
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf

const Reviews: React.FC = () => {
	const product = useProduct();
	const dispatch = useDispatch();
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [reviews, setReviews] = useState<Review[]>([]);

	const [hasReviewed, setHasReviewed] = useState(false);
	const [_hasBuy, setHasBuy] = useState(false);
	const [userProduct, setUserProduct] = useState(false);
	const [showAllReviews, _setShowAllReviews] = useState(false);

	const userLogin = useSelector((state: RootState) => state.user.userLogin);
	const fullName = userLogin.user.fullName;

	const session = window.localStorage.getItem("token");

	useEffect(() => {
		if (parseInt(product.userID, 10) === parseInt(userLogin.user.id, 10)) {
			setUserProduct(true);
		}
	}, [userLogin, product.userID]);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const reviewsData: Review[] = await getAllReviewsProduct(product.id);
				setReviews(reviewsData);

				//? Verificar si el usuario actual ya ha dejado una reseña
				const hasReviewed = reviewsData.some(
					(review) => review.userID === Number(userLogin.user.id)
				);
				setHasReviewed(hasReviewed);
			} catch (error) {
				console.error("Error al obtener las reseñas:", error);
			}
		};

		fetchReviews();
	}, [product.id, fullName]);

	useEffect(() => {
		const fetchPurchases = async () => {
			try {
				const response = await getPurchasesByUser(Number(userLogin.user.id));
				const findProduct = response.some((purchase: Purchase) => {
					return purchase.products.find(
						(producto) => producto.id === product.id
					);
				});

				if (findProduct) {
					setHasBuy(true);
				}
			} catch (error: any) {
				console.log(error);
			}
		};
		fetchPurchases();
	}, [product.unities]);

	//? Maneja los comentarios
	const handleCommentChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setComment(event.target.value);
	};

	//? Submitea a la base de datos
	const submitReview = async () => {
		if (hasReviewed) {
			setRating(0);
			setComment("");
			return;
		}

		try {
			const userID = parseInt(userLogin.user.id, 10);
			const productID = Number(product.id);

			await createReview(userID, fullName, productID, comment, rating);

			const newRatings = [...reviews.map((review) => review.rating), rating];
			const newAverage =
				newRatings.reduce((sum, rating) => sum + rating, 0) / newRatings.length;
			const formattedAverage = parseFloat(newAverage.toFixed(2));

			const productForUpdate = { ...product, rating: formattedAverage };
			dispatch(updateRating(formattedAverage));
			setRating(0);
			setComment("");

			try {
				updateProduct( productForUpdate);
			} catch (error) {
				console.error(
					"Error al actualizar la calificación del producto:",
					error
				);
			}

			//? Marcar que el usuario ha dejado una reseña
			setHasReviewed(true);

			//? Volver a cargar las reseñas actualizadas
			const reviewsData: Review[] = await getAllReviewsProduct(product.id);
			setReviews(reviewsData);
		} catch (error) {
			console.error("Error al enviar la revisión:", error);
		}
	};

	//? Controlador de las estrellas
	const handleRatingChange = async (newRating: number) => {
		setRating(newRating);
	};

	//? elimina las reviews
	const handleDeleteReview = async (reviewId: number) => {
		try {
			await deleteReview(reviewId);
			setHasReviewed(false);

			const updatedReviews = reviews.filter((review) => review.id !== reviewId);
			setReviews(updatedReviews);

			const newRatings = updatedReviews.map((review) => review.rating);
			const newAverage =
				newRatings.reduce((sum, rating) => sum + rating, 0) / newRatings.length;
			const formattedAverage = parseFloat(newAverage.toFixed(2));

			try {
				const updatedProduct = { ...product, rating: formattedAverage };
				await updateProduct(updatedProduct);

				dispatch(updateRating(formattedAverage));
			} catch (error) {
				console.error(
					"Error al actualizar la calificación del producto:",
					error
				);
			}

			swal("Se eliminó la reseña");
		} catch (error) {
			console.error("Error al eliminar la review:", error);
		}
	};

	return (
		<div>
			<section className="review-container">
				{hasReviewed ? (
					<div>
						<p>Ya has dejado una reseña</p>
						<br />
					</div>
				) : userProduct  || !session ? null : (
					<div>
						<section className="detail-product-section">
							<h2>Reseñas:</h2>
							<RatingStars
								rating={rating}
								onRatingChange={handleRatingChange}
							/>
						</section>
						<textarea
							value={comment}
							onChange={handleCommentChange}
							placeholder="Escribe tu comentario..."
						></textarea>
						<button
							onClick={submitReview}
							disabled={rating === 0 || comment === ""}
						>
							Enviar Reseña
						</button>
					</div>
				)}

				<div className="detail-product-review-container">
					<div className="detail-product-review">
						<h2>Reseñas:</h2>
						{reviews.length === 0 && (
							<p>Este producto no tiene reseñas todavía</p>
						)}
						{showAllReviews
							? reviews.map((review) => (
									<div key={review.id} className="review-item">
										<p>Usuario: {review.fullName}</p>
										<p>Estrellas: {review.rating}⭐</p>
										<p>Comentario: {review.text}</p>
										{review.userID === parseInt(userLogin.user.id, 10) && (
											<button
												className="review__detele"
												onClick={() => handleDeleteReview(review.id)}
											>
												X
											</button>
										)}
									</div>
							  ))
							: reviews.slice(0, 3).map((review) => (
									<div key={review.id} className="review-item">
										{review.userID === parseInt(userLogin.user.id, 10) && (
											<button
												className="review__detele"
												onClick={() => handleDeleteReview(review.id)}
											>
												X
											</button>
										)}
										<div className="review__cont">
											<p>Usuario: {review.fullName}</p>
											<p>Estrellas: {review.rating}⭐</p>
											<p>Comentario: {review.text}</p>
										</div>
									</div>
							  ))}
					</div>
				</div>

				{reviews.length > 3 && !showAllReviews && (
					<Link to={`/review/${product.id}`}>
						<button>Ver todas las reseñas</button>
					</Link>
				)}
			</section>
		</div>
	);
};

export default Reviews;

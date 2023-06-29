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
import { Review } from "../utils/interfaces";
import { Link } from "react-router-dom";

const Reviews: React.FC = () => {
  const product = useProduct();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  const [hasReviewed, setHasReviewed] = useState(false);
  const [userProduct, setUserProduct] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const userLogin = useSelector((state: RootState) => state.user.userLogin);
  const fullName = userLogin.user.fullName;

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

        // Verificar si el usuario actual ya ha dejado una reseña
        const hasReviewed = reviewsData.some(
          (review) => review.fullName === fullName
        );
        setHasReviewed(hasReviewed);
      } catch (error) {
        console.error("Error al obtener las reseñas:", error);
      }
    };

    fetchReviews();
  }, [product.id, fullName]);

  // Maneja los comentarios
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  // Submitea a la base de datos
  const submitReview = async () => {
    if (hasReviewed) {
      console.log("El usuario ya ha dejado una reseña");
      setRating(0);
      setComment("");
      return;
    }

    try {
      const userID = parseInt(userLogin.user.id, 10);
      const productID = product.id;

      await createReview(userID, fullName, productID, comment, rating);

      const newRatings = [...reviews.map((review) => review.rating), rating];
      const newAverage =
        newRatings.reduce((sum, rating) => sum + rating, 0) / newRatings.length;
      const formattedAverage = parseFloat(newAverage.toFixed(2));

      const updatedProduct = { ...product, rating: formattedAverage };
      dispatch(updateRating(formattedAverage));
      setRating(0);
      setComment("");

      try {
        updateProduct(updatedProduct);
      } catch (error) {
        console.error(
          "Error al actualizar la calificación del producto:",
          error
        );
      }

      // Marcar que el usuario ha dejado una reseña
      setHasReviewed(true);

      // Volver a cargar las reseñas actualizadas
      const reviewsData: Review[] = await getAllReviewsProduct(product.id);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error al enviar la revisión:", error);
    }
  };

  // Controlador de las estrellas
  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
  };

  // elimina las reviews
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

      alert("Se eliminó la reseña");
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
          </div>
        ) : userProduct ? null : (
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

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useProduct from "../hooks/useProduct";
import RatingStars from "./ReviewStar";
import { updateRating } from "../redux/features/productSlice";
import { updateProduct } from "../services/productServices";
import { createReview, getAllReviewsProduct } from "../services/reviewService";
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
        // Manejar el error, mostrar una notificación de error, etc.
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
      // Manejar la situación, mostrar una notificación, etc.
      setRating(0);
      setComment("");
      return;
    }

    try {
      const userID = parseInt(product.userID, 10);
      const productID = product.id;

      await createReview(userID, fullName, productID, comment, rating);

      const newRatings = [...reviews.map((review) => review.rating), rating];
      const newAverage =
        newRatings.reduce((sum, rating) => sum + rating, 0) / newRatings.length;
      const formattedAverage = parseFloat(newAverage.toFixed(2));

      const updatedProduct = { ...product, rating: formattedAverage };
      dispatch(updateRating(formattedAverage));
      // Restablecer los valores de los inputs a su estado inicial
      setRating(0);
      setComment("");

      try {
        updateProduct(updatedProduct);
      } catch (error) {
        console.error(
          "Error al actualizar la calificación del producto:",
          error
        );
        // Manejar el error, mostrar una notificación de error, etc.
      }

      // Marcar que el usuario ha dejado una reseña
      setHasReviewed(true);

      // Volver a cargar las reseñas actualizadas
      const reviewsData: Review[] = await getAllReviewsProduct(product.id);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error al enviar la revisión:", error);
      // Manejar el error, mostrar una notificación de error, etc.
    }
  };

  // Controlador de las estrellas
  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
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
            <button onClick={submitReview}>Enviar Reseña</button>
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
                  </div>
                ))
              : reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="review-item">
                    <p>Usuario: {review.fullName}</p>
                    <p>Estrellas: {review.rating}⭐</p>
                    <p>Comentario: {review.text}</p>
                  </div>
                ))}
          </div>
        </div>

        {reviews.length > 3 && !showAllReviews && (
            <Link to={`/review/${product.id}`}>
          <button >
            Ver todas las reseñas
          </button></Link>
        )}

      </section>
    </div>
  );
};

export default Reviews;

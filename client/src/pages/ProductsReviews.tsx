import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllReviewsProduct } from "../services/reviewService";
import { Review } from "../utils/interfaces";

const ProductReviews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData: Review[] = await getAllReviewsProduct(Number(id));
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error al obtener las reseñas:", error);
        // Manejar el error, mostrar una notificación de error, etc.
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="reviews-item">
          <p className="product__review">Usuario: {review.fullName}</p>
          <p>Estrellas: {review.rating}⭐</p>
          <p className="product_coment">Comentario: {review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;

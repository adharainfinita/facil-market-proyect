import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsCardImage } from "react-icons/bs";

import useProduct from "../hooks/useProduct";
import PaymentButton from "./PaymentButton";
import RatingStars from "./ReviewStar";

import { updateRating } from "../redux/features/productSlice";
import { updateProduct } from "../services/productServices";
import { createReview, getAllReviewsProduct } from "../services/reviewService";
import { RootState } from "../redux/store";
import { Review, NotificationType } from "../utils/interfaces";

const DetailProduct = () => {
  const product = useProduct();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notification, setNotification] = useState<NotificationType>({
    isOpen: false,
    type: null,
    content: "",
  });
  const [hasReviewed, setHasReviewed] = useState(false);

  const userLogin = useSelector((state: RootState) => state.user.userLogin);
  const fullName = userLogin.user.fullName;

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

  //maneja los comentarios
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  // submitea a la base de datos

  const submitReview = async () => {
    if (hasReviewed) {
      console.log("El usuario ya ha dejado una reseña");
      // Manejar la situación, mostrar una notificación, etc.
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

  // controlador de las estrellas
  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
  };

  //FIN DEL REVIEW ----------------------------------------------------------------


  useEffect(() => {
    if (product?.images.length > 0 && !selectedImage) {
      setSelectedImage(product.images[0]);
    }
  }, [product, selectedImage]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

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
            <h2>Stock:</h2>
            <h3>{product.stock}</h3>
          </section>
          <div className=".detail-product-button">
            <PaymentButton product={product} />
          </div>

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

          {notification.isOpen && <div>{notification.content}</div>}
        </div>
        <section className="review-container">
          <div className="detail-product-review-container">
            <div className="detail-product-review">
              <h2>Reseñas:</h2>
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <p>Usuario: {review.fullName}</p>
                  <p>Estrellas: {review.rating}⭐</p>
                  <p>Comentario: {review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailProduct;

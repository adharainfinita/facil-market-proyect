import { useState } from "react";

interface RatingStarsProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
  disabled?: boolean; // Nuevo prop para deshabilitar las estrellas
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  onRatingChange,
  disabled = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value: number) => {
    if (!disabled) {
      onRatingChange(value);
    }
  };

  const handleStarHover = (value: number) => {
    if (!disabled) {
      setHoverRating(value);
    }
  };

  const handleStarHoverEnd = () => {
    setHoverRating(0);
  };

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${
            (value <= (hoverRating || rating) && !disabled) ? "active" : ""
          }`}
          onClick={() => handleStarClick(value)}
          onMouseEnter={() => handleStarHover(value)}
          onMouseLeave={handleStarHoverEnd}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;

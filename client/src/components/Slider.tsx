import React, { useState } from "react";
import { useEffect } from "react";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";

interface SliderProps {
	images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
	const [currentImage, setCurrentImage] = useState(0);

	const handleNextImage = () => {
		setCurrentImage((prevImage) =>
			prevImage === images.length - 1 ? 0 : prevImage + 1
		);
	};

	const handlePrevImage = () => {
		setCurrentImage((prevImage) =>
			prevImage === 0 ? images.length - 1 : prevImage - 1
		);
	};

	const handleIndicatorClick = (index: number) => {
		setCurrentImage(index);
	};

	const interval = 5000;

	useEffect(() => {
		const timer = setInterval(handleNextImage, interval);

		return () => {
			clearInterval(timer);
		};
	}, [interval]);

	return (
		<div className="slider">
			<BiLeftArrowCircle
				className="slider__arrow slider__prev-button"
				onClick={handlePrevImage}
			/>
			<img
				className="slider__image"
				src={images[currentImage]}
				alt={`Image ${currentImage}`}
			/>
			<BiRightArrowCircle
				className="slider__arrow slider__next-button"
				onClick={handleNextImage}
			/>
			<div className="slider__indicators">
				{images.map((_, index) => (
					<div
						key={index}
						className={`slider__indicator ${
							index === currentImage ? "slider__indicator--active" : ""
						}`}
						onClick={() => handleIndicatorClick(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default Slider;

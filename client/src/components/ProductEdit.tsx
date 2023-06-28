import useProduct from "../hooks/useProduct";
import { BsCardImage } from "react-icons/bs";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
//import { useDispatch } from "react-redux";
//import { updateProduct } from "../services/productServices";

const ProductEdit = () => {
	const product = useProduct();
	//const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = useState<string>("");
	const [content, setContent] = useState<any>([]);
	const [editMode, setEditMode] = useState<boolean>(false);

	useEffect(() => {
		setContent(product);
		if (product?.images.length > 0 && !selectedImage) {
			setSelectedImage(product.images[0]);
		}
	}, [product, selectedImage]);

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	const handleModes = (event: MouseEvent<HTMLElement>) => {
		console.log(event.target);
	};

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		setContent({
			...content,
			[name]: value,
		});
	};

	return (
		<div className="edit-detail-product-container">
			<div className="edit-detail-product">
				<div className="edit-conteiner-pre-image">
					{product.images.map((img: string, index: number) => (
						<div
							key={index}
							className="edit-pre-image"
							onClick={() => handleImageClick(img)}
						>
							{img ? (
								<img
									className="edit-preview-image"
									src={img}
									alt="preview images"
								/>
							) : (
								<BsCardImage className="react-icon" />
							)}
						</div>
					))}
				</div>
				<div className="edit-detail-product-image">
					<img src={selectedImage} alt={product.name} />
				</div>
				<div className="edit-conteiner-info">
					<div className="edit-conteiner-name-price">
						<h1 className="edit-detail-product-name">
							<input
								type="text"
								name="name"
								value={content.name}
								onChange={handleChange}
							/>
						</h1>

						<h1 className="edit-detail-product-price">
							$
							{product.price.toLocaleString("es-AR", {
								minimumFractionDigits: 0,
							})}
						</h1>
					</div>

					<div className="edit-detail-product-info">
						<section className="edit-detail-product-section">
							<h2>Categoria:</h2>
							<h3>{product.categoryName}</h3>
						</section>

						<section className="edit-detail-product-section">
							<h2>Ubicación:</h2>
							<h3>{product.location}</h3>
						</section>

						<section className="edit-detail-product-section">
							<h2>Estado:</h2>
							<h3>{product.status}</h3>
						</section>

						<section className="edit-detail-product-section">
							<h2>Unidades:</h2>
							<h3>{product.stock}</h3>
						</section>

						<section className="edit-detail-product-section">
							<div className="edit-container-description">
								<h2>Descripción:</h2>
								<p className="edit-detail-product-description">
									{product.description}
								</p>
							</div>
						</section>
					</div>
				</div>
				<button className="edit-btn" onClick={(event) => handleModes(event)}>
					Edit
				</button>
				<button className="save-btn" onClick={handleModes}>
					Save
				</button>
			</div>
		</div>
	);
};

export default ProductEdit;

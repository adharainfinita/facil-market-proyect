import useProduct from "../hooks/useProduct";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import axios from "axios";
import Dropzone from "react-dropzone";
import { RootState } from "../redux/store";
import { updateProduct } from "../services/productServices";
const ProductEdit = () => {
	const categories = useSelector((state: RootState) => state.category.value);
	const product = useProduct();
	//const dispatch = useDispatch();
	const [content, setContent] = useState<any>([]);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [_loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		//setea el content con los datos del producto
		setContent(product);
	}, [product]);

	const [selectedImage, setSelectedImage] = useState<string>("");

	useEffect(() => {
		//selecciona la imagen
		if (content.images?.length > 0 && !selectedImage) {
			setSelectedImage(content.images[0]);
		}
	}, [content]);

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	const handleModes = (event: React.MouseEvent<HTMLButtonElement>) => {
		const buttonText = event.currentTarget.textContent;
		buttonText === "Editar" && setEditMode(true);
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

	//? proban2
	const uploadImages = async (files: File[]): Promise<void> => {
		setLoading(true);

		try {
			const uploadPromises = files.map(async (file: File) => {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("tags", "codeinfuse, medium, gist");
				formData.append("upload_preset", "facilmarket");
				formData.append("api_key", "711728988333761");

				const res = await axios.post(
					"https://api.cloudinary.com/v1_1/facilmarket/image/upload",
					formData,
					{
						headers: { "X-Requested-With": "XMLHttpRequest" },
					}
				);

				return res.data.secure_url;
			});

			const uploadedImages = await Promise.all(uploadPromises);
			setContent({
				...content,
				images: [...content.images, ...uploadedImages],
			});
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const contentPrevImages = () => {
		return (
			<div className="edit-conteiner-pre-image">
				{content.images?.map((img: string, index: number) => (
					<div
						key={index}
						className="edit-pre-image"
						onClick={() => handleImageClick(img)}
					>
						<img
							className="edit-preview-image"
							src={img}
							alt="preview images"
						/>
					</div>
				))}
			</div>
		);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		//? set info
		const categoryFound = categories.find(
			(category) => category.id === Number(content.categoryID)
		);

		const categoryName = categoryFound
			? categoryFound.name
			: content.categoryName;

		content.categoryName = categoryName;

		updateProduct(content);

		setEditMode(false);
		console.log(content);
	};

	const editModePrevImages = () => {
		return (
			<div className="edit-conteiner-pre-image">
				{content.images?.map((img: string, index: number) => (
					<div>
						<div
							key={index}
							className="edit-pre-image"
							onClick={() => handleImageClick(img)}
						>
							{" "}
							<button
								className="edit__x"
								onClick={() => handleDeleteImg(index)}
								disabled={content.images.length === 1}
							>
								X
							</button>
							<img
								className="edit-preview-image"
								src={img}
								alt="preview images"
							/>
						</div>
					</div>
				))}

				<label htmlFor="form__input-image">
					<Dropzone onDrop={uploadImages}>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps({ className: "dropzone" })}>
									<input {...getInputProps()} />
									<div className="edit-pre-image">
										<h2>+</h2>
									</div>
								</div>
							</section>
						)}
					</Dropzone>
				</label>
			</div>
		);
	};

	const handleDeleteImg = (index: number) => {
		if (selectedImage === content.images[index]) {
			setSelectedImage(content.images[index + 1]);
		}

		const updatedImages = [...content.images];
		updatedImages.splice(index, 1);

		const updatedContent = {
			...content,
			images: updatedImages,
		};

		setContent(updatedContent);
	};

	return (
		<div className="edit-detail-product-container">
			<button className="buttom_close">
				<Link to="/ventas" className="close-link">
					<AiOutlineArrowLeft /> Volver
				</Link>
			</button>
			<form onSubmit={handleSubmit}>
				<div className="edit-detail-product">
					{editMode ? editModePrevImages() : contentPrevImages()}
					<div className="edit-detail-product-image">
						<img className="edit__img" src={selectedImage} alt={product.name} />
					</div>
					<div className="edit-conteiner-info">
						<div className="edit-conteiner-name-price">
							<h4 className="edit-detail-product-name">
								Nombre:
								{editMode ? (
									<input
										type="text"
										name="name"
										value={content.name}
										onChange={handleChange}
									/>
								) : (
									content.name
								)}
							</h4>

							<h4 className="edit-detail-product-price">
								Precio:
								{editMode ? (
									<input
										type="text"
										name="price"
										value={content.price}
										onChange={handleChange}
									/>
								) : (
									`$${content.price}`
								)}
							</h4>
						</div>

						<div className="edit-detail-product-info">
							<section className="edit-detail-product-section">
								<h2>Categoria:</h2>
								{editMode ? (
									<select
										name="categoryID"
										value={content.categoryID}
										onChange={handleChange}
									>
										{categories.map((category: any, index: number) => (
											<option key={index} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
								) : (
									<h2>{content.categoryName}</h2>
								)}
							</section>

							<section className="edit-detail-product-section">
								<h2>Ubicación:</h2>
								<h3>
									{editMode ? (
										<input
											type="text"
											name="location"
											value={content.location}
											onChange={handleChange}
										/>
									) : (
										content.location
									)}
								</h3>
							</section>

							<section className="edit-detail-product-section">
								<h2>Estado:</h2>
								<h3>
									{editMode ? (
										<select
											name="status"
											value={content.status}
											onChange={handleChange}
										>
											<option value="Nuevo">Nuevo</option>
											<option value="Usado">Usado</option>
										</select>
									) : (
										content.status
									)}
								</h3>
							</section>

							<section className="edit-detail-product-section">
								<h2>Unidades:</h2>
								<h3>{content.stock}</h3>
							</section>

							<section className="edit-detail-product-section">
								<h2>Cantidad:</h2>
								<h3>
									{editMode ? (
										<input
											type="text"
											name="unities"
											value={content.unities}
											onChange={handleChange}
										/>
									) : (
										content.unities
									)}
								</h3>
							</section>

							<section className="edit-detail-product-section">
								<div className="edit-container-description">
									<h2>Descripción:</h2>
									{editMode ? (
										<textarea
											name="description"
											placeholder="Ingresa una descripción para tu producto"
											value={content.description}
											onChange={handleChange}
										/>
									) : (
										content.description
									)}
								</div>
							</section>
						</div>
					</div>
					<button
						className="edit-btn"
						onClick={handleModes}
						disabled={editMode}
					>
						Editar
					</button>
				</div>
				<button className="save-btn" type="submit" disabled={!editMode}>
					Guardar
				</button>
			</form>
		</div>
	);
};

export default ProductEdit;

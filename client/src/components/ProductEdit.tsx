import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { updateProduct } from "../services/productServices";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { capitalizeFirstLetter } from "../utils/capitalizerFirstLetter";
import { getAllProducts } from "../services/productServices";
import { PutProduct } from "../utils/interfaces";
import { getProducts } from "../redux/features/productSlice";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Category } from "../utils/interfaces";

const ProductEditForm: React.FC = () => {
	const product = useProduct();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const categories = useSelector((state: RootState) => state.category.value);

	const [formData, setFormData] = useState<PutProduct>({
		id: product.id,
		name: "",
		description: "",
		images: [],
		price: 0,
		categoryID: 0,
		unities: 0,
		status: "",
		categoryName: "",
	});

	const [loading, setLoading] = useState<boolean>(false);
	const [images, setImages] = useState<string[]>([]);

	const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");

	const [deletedImages, setDeletedImages] = useState<string[]>([]);

	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			name: product.name,
			description: product.description,
			images: product.images,
			price: product.price,
			categoryID: product.categoryID,
			unities: product.unities,
			status: product.status,
			categoryName: product.categoryName,
		}));
		setSelectedCategoryName(product.categoryName);
		setImages(product.images);
	}, [product]);

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		if (name === "categoryID") {
			const selectedCategory = categories.find(
				(category: Category) => category.id === Number(value)
			);

			if (selectedCategory) {
				setSelectedCategoryName(selectedCategory.name);
				setFormData((prevFormData) => ({
					...prevFormData,
					categoryName: selectedCategory.name,
				}));
			}
		}

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

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
			setImages((prevImages) => [...prevImages, ...uploadedImages]);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const handleDeleteImage = (index: number) => {
		const updatedImages = [...images];
		updatedImages.splice(index, 1);
		setDeletedImages((prevDeletedImages) => [
			...prevDeletedImages,
			images[index],
		]);
		setImages(updatedImages);
	};

	const imagePreview = () => {
		if (loading === true) {
			return <h3>Cargando Imágenes...</h3>;
		}
		if (loading === false) {
			return (
				<div>
					{images.length <= 0 ? (
						<p>No hay imágenes</p>
					) : (
						images.map((item, index) => (
							<div key={index} className="image-preview">
								<img alt="image preview" width={60} height={60} src={item} />
								<span
									className="delete-icon"
									onClick={(event) => {
										event.stopPropagation();
										handleDeleteImage(index);
									}}
								>
									❌
								</span>
							</div>
						))
					)}
				</div>
			);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const putProduct = {
				id: product.id,
				name: capitalizeFirstLetter(formData.name) || product.name,
				description:
					capitalizeFirstLetter(formData.description) || product.description,
				unities: formData.unities || product.unities,
				images: [...new Set([...images, ...product.images])].filter(
					(item) => !deletedImages.includes(item)
				),
				status: formData.status || product.status,
				price: Number(formData.price) || product.price,
				categoryID: Number(formData.categoryID) || product.categoryID,
				categoryName: formData.categoryName || product.categoryName,
			};
			await updateProduct(putProduct);
			alert("Producto editado con éxito");
			navigate(`/product/detail/${product.id}`);
		} catch (error) {
			console.log(error);
		}

		const fetchProducts = async () => {
			try {
				const response = await getAllProducts();
				if (response) {
					dispatch(getProducts(response));
				} else {
					console.error("No existen productos");
				}
			} catch (error) {
				console.error("Error al obtener los productos:", error);
			}
		};

		fetchProducts();
	};
	return (
		<div>
			<h2>Editar Producto</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Nombre:</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="description">Descripción:</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="price">Precio:</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="categoryID">Categoría:</label>
					<select
						name="categoryID"
						value={formData.categoryID}
						onChange={handleChange}
					>
						{categories.map((category: Category, index: number) => (
							<option key={index} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
					<span>{selectedCategoryName}</span>
				</div>

				<div className="form-group">
					<label htmlFor="form__input-stock">
						Unidades:
						<input
							name="unities"
							value={formData.unities}
							onChange={handleChange}
							type="number"
						/>
					</label>
				</div>

				<label htmlFor="form__input-status">
						Estado:
						<div className="form-input-status">
							<div className="content">
								<label htmlFor="new">Nuevo</label>
								<input
									type="radio"
									name="status"
									id="new"
									onChange={handleChange}
									value={"Nuevo"}
								/>
							</div>

							<div className="content">
								<label htmlFor="usage">Usado</label>
								<input
									type="radio"
									name="status"
									id="usage"
									onChange={handleChange}
									value="Usado"
								/>
							</div>
						</div>
					</label>

				<div className="form-group">
					<label htmlFor="form__input-image">
						Imagen:
						<Dropzone onDrop={uploadImages}>
							{({ getRootProps, getInputProps }) => (
								<section>
									<div {...getRootProps({ className: "dropzone" })}>
										<input {...getInputProps()} />
										<span>📂</span>
									</div>
								</section>
							)}
						</Dropzone>
					</label>
				</div>
				<div>{imagePreview()}</div>
				<button type="button" onClick={handleSubmit}>
					Guardar cambios
				</button>
			</form>
		</div>
	);
};

export default ProductEditForm;

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { getAllProducts, postProduct } from "../services/productServices";
import axios, { AxiosHeaderValue } from "axios";
import { FormCreateProduct, ErrorsFormProduct } from "../utils/interfaces";
import { validate } from "../utils/FormProductValidation";
import { capitalizeFirstLetter } from "../utils/capitalizerFirstLetter";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { getProducts } from "../redux/features/productSlice";

const FormCreateProduct: React.FC = () => {
	const categories = useSelector((state: RootState) => state.category.value);
	const userLogin = useSelector((state: RootState) => state.user.userLogin);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const session = window.localStorage.getItem("token");

	//? Estado Local
	const [errors, setErrors] = useState<Partial<ErrorsFormProduct>>({
	name: "",
	description: "",
	unities: "",
	status: "",
	rating: "",
	images: "",
	location: "",
	price: ""
	});
	const [images, setImages] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormCreateProduct>({
		userID: Number(userLogin.user.id),
		categoryID: 1,
		name: "",
		location: "",
		description: "",
		stock: "Disponible",
		unities: 0,
		status: "",
		image: [],
		price: 0,
		rating: 0,
	});

	//?probando
	const [storage, setStorage] = useLocalStorage("items", formData);

	useEffect(() => {
		session ? setFormData({ ...storage }) : null;
	}, [session, storage]);

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		console.log(name, value);

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		setStorage({ ...formData, [name]: value });

		setErrors(
			validate({
				...errors,
				[name]: value,
			})
		);
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
			setFormData({
				...formData,
				image: images
			})
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
console.log(formData);
console.log(errors);


	const imagePreview = () => {
		if (loading === true) {
			return <h3>Cargando Imagenes...</h3>;
		}
		if (loading === false) {
			return (
				<div>
					{images.length <= 0 ? (
						<p>No hay imágenes</p>
					) : (
						images.map((item, index) => (
							<img
								key={index}
								alt="image preview"
								width={60}
								height={60}
								src={item}
							/>
						))
					)}
				</div>
			);
		}
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		try {
			const Headers: Partial<AxiosHeaderValue> = {
				Authorization: `Bearer ${session}`,
			};

			//? Set info
			const product = {
				userID: Number(userLogin.user.id),
				categoryID: Number(formData.categoryID),
				name: capitalizeFirstLetter(formData.name),
				location: capitalizeFirstLetter(formData.location),
				description: capitalizeFirstLetter(formData.description),
				unities: Number(formData.unities),
				stock: formData.stock,
				status: formData.status,
				images: images,
				price: Number(formData.price),
				rating: 0,
			};

			postProduct(product, Headers);
			setErrors({});
			alert("Producto creado correctamente");
			window.localStorage.removeItem("items");
			navigate("/products");

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
		} catch (error: any) {
			console.log(error.message);
			alert("Datos incompletos");
		}
	};

	return (
		<>
			{session ? (
				<form className="form" onSubmit={handleSubmit}>
					<h2>Publica tu Producto</h2>
					<label className="from__input-name">
						Nombre del producto:
						<input
							type="text"
							name="name"
							placeholder="Ingresar un nombre"
							value={storage.name ? storage.name : formData.name}
							onChange={handleChange}
						/>
						{errors.name && <p className="error">{errors.name}</p>}
					</label>
					<label htmlFor="form__input-location">
						Ubicacion:
						<input
							type="text"
							name="location"
							placeholder="Ingresa tu ubicación"
							onChange={handleChange}
							value={storage.location ? storage.location : formData.location}
						/>
						{errors.location && <p className="error">{errors.location}</p>}
					</label>
					<label htmlFor="form__input-stock">
						Unidades:
						<input
							name="unities"
							value={storage.unities ? storage.unities : formData.unities}
							onChange={handleChange}
							type="number"
						/>
						{errors.unities && <p className="error">{errors.unities}</p>}
					</label>
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
						{errors.status && <p className="error">{errors.status}</p>}
					</label>
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
						{errors.images && <p className="error">{errors.images}</p>}
					</label>
					{imagePreview()}
					<label htmlFor="form__category">Categoría:</label>
					<select
						name="categoryID"
						value={
							storage.categoryID ? storage.categoryID : formData.categoryID
						}
						onChange={handleChange}
					>
						{categories.map((category: any, index: number) => (
							<option key={index} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
					<label htmlFor="price">
						Precio:
						<input
							type="number"
							id="price"
							name="price"
							value={storage.price ? storage.price : formData.price}
							onChange={handleChange}
						/>
						{errors.price && <p className="error">{errors.price}</p>}
					</label>
					<label htmlFor="form__description">Descripción:</label>
					<textarea
						name="description"
						placeholder="Ingresa una descripción para tu producto"
						value={
							storage.description ? storage.description : formData.description
						}
						onChange={handleChange}
					/>
					{errors.description && <p className="error">{errors.description}</p>}
					<button
						disabled={
							Object.values(errors).every((item) => item === "") ? false : true
						}
						type="submit"
					>
						Publicar
					</button>
				</form>
			) : (
				<div className="form-verification container">
					<div className="form-verification-card">
						<h1 className="form-verification-title">
							¡Hola! Para vender, ingresá a tu cuenta
						</h1>

						<Link to="/register">
							<button className="form-verification-button">Crear cuenta</button>
						</Link>

						<Link to="/login">
							<h2 className="form-verification-text">Ingresar</h2>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default FormCreateProduct;

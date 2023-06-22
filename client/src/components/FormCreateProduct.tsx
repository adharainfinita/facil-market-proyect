import React, { useState } from "react";
import { FormCreateProduct, ErrorsFormProduct } from "../utils/interfaces";
import { validate } from "../utils/FormProductValidation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { postProduct } from "../services/productServices";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/capitalizerFirstLetter";
import { useAuth } from "../context/AuthContext";

const FormCreateProduct: React.FC = () => {
	//? Estado Global
	const categories = useSelector((state: RootState) => state.category.value);
/* 	const idLogin = useSelector((state: RootState) => state.user.userLogin.id); */
	const auth = useAuth();
	const {uid} = auth.user

	//? hooks
	const navigate = useNavigate();

	//? Estado Local
	const [errors, setErrors] = useState<Partial<ErrorsFormProduct>>({});
	const [formData, setFormData] = useState<FormCreateProduct>({
		userID: uid,
		categoryID: 1,
		name: "",
		location: "",
		description: "",
		stock: 1,
		image: "",
		price: 1,
		rating: 0,
	});

	//? HandleChanges
	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		setErrors(
			validate({
				...formData,
				[name]: value,
			})
		);
	};

	//? HandleSubmit
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		//? Si no tengo errores
		if (!Object.keys(errors).length) {
			//? Parseo de info
			formData.name = capitalizeFirstLetter(formData.name);
			formData.location = capitalizeFirstLetter(formData.location);
			formData.description = capitalizeFirstLetter(formData.description);
			formData.stock = Number(formData.stock);
			formData.price = Number(formData.price);
			formData.categoryID = Number(formData.categoryID);

			//? Creo el producto
			try {
				postProduct(formData);
				console.log(formData)
			} catch (error: any) {
				console.log(error.message);
			}

			setFormData({
				userID: uid,
				categoryID: 1,
				name: "",
				location: "",
				description: "",
				stock: 1,
				image: "",
				price: 1,
				rating: 0,
			});
			setErrors({});
			alert("Producto creado correctamente");
			navigate("/products");
		} else {
			alert("Datos incompletos");
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2>Publica tu Producto</h2>

			<label className="from__input-name">
				Nombre del producto:
				<input
					type="text"
					name="name"
					placeholder="Ingresar un nombre"
					value={formData.name}
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
					value={formData.location}
				/>
				{errors.location && <p className="error">{errors.location}</p>}
			</label>

			<label htmlFor="form__input-stock">
				Unidades:
				<input
					name="stock"
					value={formData.stock}
					onChange={handleChange}
					type="number"
				/>
				{errors.stock && <p className="error">{errors.stock}</p>}
			</label>

			<label htmlFor="form__input-location">
				imagen:
				<input
					name="image"
					type="text"
					placeholder="URL de tu imagen"
					onChange={handleChange}
					value={formData.image}
				/>
				{errors.image && <p className="error">{errors.image}</p>}
			</label>

			<label htmlFor="form__category">Categoría:</label>
			<select
				name="categoryID"
				value={formData.categoryID}
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
					value={formData.price}
					onChange={handleChange}
				/>
				{errors.price && <p className="error">{errors.price}</p>}
			</label>

			<label htmlFor="form__description">Descripción:</label>
			<textarea
				name="description"
				placeholder="Ingresa una descripción para tu producto"
				value={formData.description}
				onChange={handleChange}
			/>
			{errors.description && <p className="error">{errors.description}</p>}
			<button type="submit">Publicar</button>
		</form>
	);
};

export default FormCreateProduct;

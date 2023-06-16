import React, { useState } from "react";
import { FormData } from "../utils/interfaces";
import { validate } from "../utils/FormProductValidation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Formulario: React.FC = () => {
	const categories = useSelector((state: RootState) => state.category.value);

	//? Estado Local
	const [errors, setErrors] = useState<Partial<FormData>>({});
	const [formData, setFormData] = useState<FormData>({
		userID: 1,
		categoryID: 1,
		name: "",
		location: "",
		description: "",
		stock: 1,
		image: "",
		price: 1,
	});

	//? HandleChanges
	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const campoActual = event.target.name;
		const valorActual = event.target.value;

		setFormData((prevFormData) => ({
			...prevFormData,
			[campoActual]: valorActual,
		}));

		setErrors(
			validate({
				...formData,
				[campoActual]: valorActual,
			})
		);
	};

	//? HandleSubmit
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		//? Si no tengo errores
		if (!Object.keys(errors).length) {
			//? Parseo de info
			formData.stock = Number(formData.stock);
			formData.price = Number(formData.price);
			formData.categoryID = Number(formData.categoryID);

			console.log(formData);
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
				Stock:
				<input
					name="stock"
					value={formData.stock}
					onChange={handleChange}
					type="number"
				/>
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
				{categories.map((category, index) => (
					<option key={index} value={category.id}>
						{category.name}
					</option>
				))}
			</select>

			<label htmlFor="price">Price:</label>
			<input
				type="number"
				id="price"
				name="price"
				value={formData.price}
				onChange={handleChange}
			/>

			<label htmlFor="form__description">Descripción:</label>
			<textarea
				name="description"
				placeholder="Ingresa una descripción para tu producto"
				value={formData.description}
				onChange={handleChange}
			/>
			{errors.description && <p className="error">{errors.description}</p>}
			<button type="submit">Enviar</button>
		</form>
	);
};

export default Formulario;

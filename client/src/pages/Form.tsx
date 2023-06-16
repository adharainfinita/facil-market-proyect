import React, { useState } from "react";
import categories from "../utils/categories";
import { FormData } from "../utils/interfaces";

const Formulario: React.FC = () => {
	//? Estado Local
	const [formData, setFormData] = useState<FormData>({
		userID: 1,
		categoryID: 1,
		name: "",
		description: "",
		stock: 1,
		image: "",
		location: "",
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
	};

	//? HandleSubmit
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		//? Parseo de info
		formData.stock = Number(formData.stock);
		formData.price = Number(formData.price);
		formData.categoryID = Number(formData.categoryID);

		console.log(formData);
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
			</label>

			<label htmlFor="form__input-location">
				Ubicacion:
				<input
					type="text"
					name="location"
					onChange={handleChange}
					value={formData.location}
				/>
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
					onChange={handleChange}
					value={formData.image}
				/>
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
				value={formData.description}
				onChange={handleChange}
			/>
			<button type="submit">Enviar</button>
		</form>
	);
};

export default Formulario;

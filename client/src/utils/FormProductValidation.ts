//? Regex
// const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))/;

import { ErrorsFormProduct, FormCreateProduct } from "./interfaces";

export const validate = (data: FormCreateProduct) => {
	const errors: Partial<ErrorsFormProduct> = {};

	//? validar name
	if (!data.name) {
		errors.name = "Este campo es obligatorio";
	} else if (data.name.length > 35) {
		errors.name = "Max: 35 caráracteres";
	}

	//? validar stock
	if (!data.stock) {
		errors.stock = "Este campo es obligatorio.";
	} else if (data.stock < 0) {
		errors.stock = "El valor ingresado no es válido";
	}

	//? validar price
	if (!data.price) {
		errors.price = "Este campo es obligatorio.";
	} else if (data.price < 1) {
		errors.price = "El valor ingresado no es válido";
	}

	//? validar location
	if (!data.location) errors.location = "Este campo es requerido";

	//? validar image URL
	// if (!data.image.length) {
	// 	errors.image = "Este campo es obligatorio";
	// } else if (!imageUrlRegex.test(data.image)) {
	// 	errors.image = "Ingresar una URL valida";
	// }

	//? validar descrption
	if (!data.description.length) {
		errors.description = "Este campo es obligatario";
	} else if (data.description.length <= 10) {
		errors.description = "Debe contener almenos 10 caracteres";
	} else if (data.description.length >= 5000) {
		errors.description = "Max: 5000 caracteres";
	}

	return errors;
};

//? Regex
const nameRegex = /^[a-zA-Z0-9\s]+$/;
const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))/;

import { FormCreateProduct } from "./interfaces";

export const validate = (data: FormCreateProduct) => {
	const errors: Partial<FormCreateProduct> = {};

	//? validar name
	if (!data.name) {
		errors.name = "Este campo es obligatorio";
	} else if (data.name.length > 35) {
		errors.name = "Max: 35 caráracteres";
	} else if (!nameRegex.test(data.name)) {
		errors.name = "Ingresar una nombre valido";
	}

	if (!data.location) errors.location = "Este campo es requerido";

	//? validar image URL
	if (!data.image.length) {
		errors.image = "Este campo es obligatorio";
	} else if (!imageUrlRegex.test(data.image)) {
		errors.image = "Ingresar una URL valida";
	}

	//? validar descrption
	if (!data.description.length) {
		errors.description = "Este campo es obligatario";
	} else if (data.description.length <= 10) {
		errors.description = "Debe contener almenos 10 caracteres";
	}

	return errors;
};

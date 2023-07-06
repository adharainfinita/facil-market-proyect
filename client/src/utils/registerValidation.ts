//const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
const regPass = /^(?=\S*?[0-9]).{6,10}\S$/;
const regEmail = /^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}).{0,35}$/i;

interface newUser {
	fullName: string;
	password: string;
	email: string;
	images?: string;
	confirm?: string;
}

export function validate(inputs: newUser) {
	const errors: Partial<newUser> = {};
	if (!inputs.fullName) errors.fullName = "Ingresa tu nombre completo";
	if (inputs.fullName.length > 35) errors.fullName = "(Max: 35 caracteres)";

	if (!regEmail.test(inputs.email))
		errors.email = "Ingresa un correo válido (Max: 35 caracteres)";
	if (!regPass.test(inputs.password))
		errors.password =
			"La contraseña debe contener: Un numero y tener entre 6 a 10 caracteres";

	if (inputs.password !== inputs.confirm)
		// Compara la contraseña y la confirmación
		errors.confirm = "Las contraseñas no coinciden";

	// if (!urlRegex.test(inputs.image)) errors.image = "Ingresa una URL válida";
	// if (inputs.images.length > 0) {
	// 	if (!urlRegex.test(inputs.images[0])) {
	// 		errors.images = ["Ingresa una URL válida"];
	// 	}
	// }

	return errors;
}

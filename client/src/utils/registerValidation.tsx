const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
const regPass = /^(?=\S*?[0-9]).{6,10}\S$/;
const regEmail = /^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}).{0,35}$/i

import { newUser } from "./interfaces";

export function validate(inputs: newUser){
    let errors: Partial<newUser> = {}
    if (!inputs.name) errors.name = "Agrega un nombre" 
    if (inputs.name.length > 35) errors.name = "(Max: 35 caracteres)" 

    if (!inputs.lastName) errors.lastName = "Agrega un apellido" 
    if (inputs.lastName.length > 35) errors.lastName = "(Max: 35 caracteres)" 

    if (!regEmail.test(inputs.email)) errors.email = "Ingresa un correo válido (Max: 35 caracteres)" 
    if (!regPass.test(inputs.password)) errors.password = "La contraseña debe contener: Un numero y tener entre 6 a 10 caracteres"

    if (inputs.confirm && inputs.password !== inputs.confirm) // Compara la contraseña y la confirmación
    errors.confirm = "Las contraseñas no coinciden";
    
    if (!urlRegex.test(inputs.image)) errors.image = "Ingresa una URL válida"

    return errors
  } 
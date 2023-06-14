import { FormData } from "../pages/Form";
const validation = (formData: FormData) => {
  const errors = {};

  // Validar la propiedad "category"
  if (formData.category.trim() === "") {
    // errors.category="La categoría es requerida.";
  }

  // Validar la propiedad "productName"
  if (formData.productName === "") {
    console.log("El nombre del producto es requerido.");
  }

  // Validar la propiedad "description"
  if (formData.description === "") {
  
    console.log("La descripción es requerida.");
  }

  // Validar la propiedad "location"
  if (formData.location.trim() === "") {
 
    "La ubicación es requerida."
  }

  // Validar la propiedad "price"
  if (formData.price <= 0) {

    "El precio debe ser mayor que cero."
  }

  // Validar la propiedad "stock"
  if (formData.stock < 0) {

    "El stock no puede ser negativo."
  }



  return errors;
};

export default validation;
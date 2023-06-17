import axios from 'axios';

interface Category {
  name: string;
}

const categories: Category[] = [
  { name: "Ropa y accesorios" },
  { name: "Computación" },
  { name: "Smartphone" },
  { name: "Electrodomesticos" },
  { name: "Indumentaria" },
  { name: "Inmuebles" },
  { name: "Vehiculos" },
  { name: "Hogar" },
  { name: "Belleza" },
  { name: "Libros" },
];
export const getAllCategory = async () => {
  try {
    const response = await axios.get("http://localhost:3001/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories");
    return [];
  }
};

const postCategory = async (data: string) => {
  try {
    // Verificar si la categoría ya existe antes de hacer la solicitud POST
    const existingCategory = await axios.get(`http://localhost:3001/category?name=${encodeURIComponent(data)}`);
    if (existingCategory.data.length > 0) {
      return existingCategory.data[0];
    }

    // La categoría no existe, enviar la solicitud POST
    const response = await axios.post("http://localhost:3001/category", { name: data });
    console.log(`Post successful for category: ${data}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error posting category: ${data}`);
    return null;
  }
};


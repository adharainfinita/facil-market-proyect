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

const postCategory = async (data: string) => {
  try {
    const response = await axios.post("http://localhost:3001/category", { name: data });
    console.log(`Post successful for category: ${data}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error posting category: ${data}`);
    return null;
  }
};

const promiseArray = categories.map((category) => postCategory(category.name));

Promise.all(promiseArray)
  .then((results) => {
    console.log(results); // Mostrar el array de resultados completo
  })
  .catch((error) => {
    console.error(error.message);
  });








export const getCategory = async () => {
	try {
		const response = await axios("http://localhost:3001/category");
		return response.data;
	} catch (error: any) {
		const errorMessage = error.response
			? error.response.data.error
			: error.message;
		alert(errorMessage);
	}
};

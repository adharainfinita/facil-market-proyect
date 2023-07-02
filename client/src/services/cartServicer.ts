import axios from "axios";
const URL_HOST = import.meta.env.VITE_HOST;

export const getAllItems = async () => {
  try {
    const response = await axios.get<any[]>(`${URL_HOST}/cart`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los elementos del carrito");
  }
};

export const addItem = async (userID: number, productID: number) => {
  try {
    const response = await axios.post<any>(`${URL_HOST}/cart`, {
      userID,
      productID,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar el elemento al carrito");
  }
};

export const removeItem = async (id: number) => {
  try {
    const response = await axios.delete<any>(`${URL_HOST}/cart/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el elemento del carrito");
  }
};

export const UpdateCart = {
  updateCart: async (userId: number, products: any[]): Promise<Response> => {
    try {
      const response = await axios.put(`${URL_HOST}/cart/${userId}`, {
        products,
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el carrito de compras:", error);
      throw new Error("Ocurrió un error al actualizar el carrito de compras");
    }
  },
};

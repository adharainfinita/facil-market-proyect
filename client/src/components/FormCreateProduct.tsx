import React, { useState, ChangeEvent, FormEvent } from "react";
import { FormCreateProduct, ErrorsFormProduct } from "../utils/interfaces";
import { validate } from "../utils/FormProductValidation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { postProduct } from "../services/productServices";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/capitalizerFirstLetter";
import useImageUploader from "../hooks/useImageUploader";

const FormCreateProduct: React.FC = () => {
  const categories = useSelector((state: RootState) => state.category.value);
  const idLogin = useSelector((state: RootState) => state.user.userLogin.id);
  const { image, uploadImg } = useImageUploader("facilmarket");
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<ErrorsFormProduct>>({});

  const [formData, setFormData] = useState<FormCreateProduct>({
    userID: Number(idLogin),
    categoryID: 1,
    name: "",
    location: "",
    description: "",
    stock: 1,
    image: "",
    price: 0,
    rating: 0,
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors(
      validate({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!Object.keys(errors).length) {
      try {
        const product = {
          userID: Number(idLogin),
          categoryID: Number(formData.categoryID),
          name: capitalizeFirstLetter(formData.name),
          location: capitalizeFirstLetter(formData.location),
          description: capitalizeFirstLetter(formData.description),
          stock: Number(formData.stock),
          image,
          price: Number(formData.price),
          rating: 0,
        };

        postProduct(product);
      } catch (error: any) {
        console.log(error.message);
      }

      setFormData({
        userID: Number(idLogin),
        categoryID: 1,
        name: "",
        location: "",
        description: "",
        stock: 1,
        image: "",
        price: 1,
        rating: 0,
      });
      setErrors({});
      alert("Producto creado correctamente");
      navigate("/products");
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
        Unidades:
        <input
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          type="number"
        />
        {errors.stock && <p className="error">{errors.stock}</p>}
      </label>

      <label htmlFor="form__input-image">
        Imagen:
        <input name="image" type="file" accept="image/*" onChange={uploadImg} />
        {errors.image && <p className="error">{errors.image}</p>}
      </label>

      <label htmlFor="form__category">Categoría:</label>
      <select
        name="categoryID"
        value={formData.categoryID}
        onChange={handleChange}
      >
        {categories.map((category: any, index: number) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="price">
        Precio:
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error">{errors.price}</p>}
      </label>

      <label htmlFor="form__description">Descripción:</label>
      <textarea
        name="description"
        placeholder="Ingresa una descripción para tu producto"
        value={formData.description}
        onChange={handleChange}
      />
      {errors.description && <p className="error">{errors.description}</p>}
      <button type="submit">Publicar</button>
    </form>
  );
};

export default FormCreateProduct;

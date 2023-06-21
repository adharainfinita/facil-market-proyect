import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

import { FormCreateProduct, ErrorsFormProduct } from "../utils/interfaces";
import { validate } from "../utils/FormProductValidation";
import { capitalizeFirstLetter } from "../utils/capitalizerFirstLetter";

import { postProduct } from "../services/productServices";
import axios from "axios";
// import useImageUploader from "../hooks/useImageUploader";

const FormCreateProduct: React.FC = () => {
  const categories = useSelector((state: RootState) => state.category.value);
  const idLogin = useSelector((state: RootState) => state.user.userLogin.id);
  // const { images, loading, uploadImg } = useImageUploader("facilmarket");
  const navigate = useNavigate();

  const [image, setImage] = useState(Array<string>);
  const [loading, setLoading] = useState("");

  const [errors, setErrors] = useState<Partial<ErrorsFormProduct>>({});

  const [formData, setFormData] = useState<FormCreateProduct>({
    userID: Number(idLogin),
    categoryID: 1,
    name: "",
    location: "",
    description: "",
    stock: 1,
    image: [],
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

  const handleDrop = (files: any) => {
    const uploaders = files.map(async (file: any) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "facilmarket");
      formData.append("api_key", "711728988333761");
      setLoading("true");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/facilmarket/image/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      const data = res.data;
      const fileURL = data.secure_url;
      console.log(fileURL);
      const specificArrayInObject = [];
      specificArrayInObject.push(fileURL);
      console.log("specificArrayInObject",specificArrayInObject)
      const newObj = { ...image, specificArrayInObject };
      setImage([...image, fileURL]);
      console.log({"imagenes": image});
    });
    axios.all(uploaders).then(() => {
      setLoading("false");
    });
  };

  const imagePreview = () => {
    if (loading === "true") {
      return <h3>Cargando Imagenes...</h3>;
    }
    if (loading === "false") {
      return (
        <div>
          {image.length <= 0
            ? "No hay imagenes"
            : image.map((item, index:number) => (
                <img key={index} alt="image preview" width={50} height={50} src={item} />
              ))}
        </div>
      );
    }
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
        image: [],
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
        {/* <input name="image" type="file" accept="image/*" onChange={uploadImg} /> */}
        <Dropzone
          className="dropzone"
          onDrop={handleDrop}
          onChange={(e: any) => setImage(e.target.value)}
          value={image}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <span>📂</span>
              </div>
            </section>
          )}
        </Dropzone>
        {errors.image && <p className="error">{errors.image}</p>}
      </label>
      {imagePreview()}

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

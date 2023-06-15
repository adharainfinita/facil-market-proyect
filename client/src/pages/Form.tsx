import React, { useState } from "react";

export interface FormData {
  category: string;
  productName: string | number;
  description: string | number;
  location: string;
  price: number;
  stock: number;
}

const Formulario: React.FC = () => {
  //estados
  const [formData, setFormData] = useState<FormData>({
    category: "",
    productName: "",
    description: "",
    location: "",
    price: 0,
    stock: 0,
  });
  const [file, setFile] = useState<string>("")

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    console.log("Nombre del producto:", formData.productName);
    console.log("Categoría seleccionada:", formData.category);
    console.log("precio:", formData.price);
    console.log("ubicacion:", formData.location);
    console.log("descripcion:", formData.description);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Publica tu Producto</h2>

      <label className="from__input-name">
        Nombre del producto:
        <input
          type="text"
          name="name"
          value={formData.productName}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="form__input-location">
        Ubicacion:
        <input type="text" name="location" onChange={handleChange} value={formData.location} />
      </label>

      <label htmlFor="form__input-stock">
        Stock:
        <input name="stock" value={formData.stock} onChange={handleChange} type="number" />
      </label>

      <label htmlFor="form__input-location">
        imagen:
        <input name="imagen" type="text" onChange={(e) => setFile(e.target.value)} value={file} />
      </label>

      <label htmlFor="form__category">Categoría:</label>
      <select id="category" value={formData.category} onChange={handleChange}>
        <option value="">Seleccionar categoría</option>
        <option value="vehiculos">Vehículos</option>
        <option value="electrodomesticos">Electrodomésticos</option>
        <option value="muebles">Muebles</option>
        <option value="consolas">Video juegos</option>
        <option value="smartphones">Smartphones</option>
      </select>
      <p>{formData.category}</p>

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />

      <label htmlFor="form__description">Descripción:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;

import useProduct from "../hooks/useProduct";
import { BsCardImage } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";

//? Imagenes de prueba
const productImage = [
	{
		name: "perrito programador",
		url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
	},

	{
		name: "notebook-code",
		url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0YWRvcmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
	},

	{
		name: "Estudiando",
		url: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=896&q=80",
	},

	{
		name: "img4",
		url: "",
	},
];

const DetailProduct = () => {
	const product = useProduct();
	return (
		<div className="detail-product-container">
			<div className="detail-product">
				<div className="conteiner-pre-image">
					{productImage.map((img, index) => {
						return (
							<div key={index} className="pre-image">
								{img.url.length ? (
									<img className="preview-image" src={img.url} alt={img.name} />
								) : (
									<BsCardImage className="react-icon" />
								)}
							</div>
						);
					})}
				</div>

				{/*//? Imagenes principal del producto */}
				<div className="detail-product-image">
					<img src={product?.image} alt={product.name} />
				</div>

				{/*//? Informacion general del producto */}
				<div className="conteiner-info">
					<div className="conteiner-name-price">
						<h1 className="detail-product-name">{product.name}</h1>
						<h1 className="detail-product-price">
							$
							{product.price.toLocaleString("es-AR", {
								minimumFractionDigits: 0,
							})}
						</h1>
					</div>

					<div className="detail-product-info">
						<section className="detail-product-section">
							<h2>Categoria:</h2>
							<h3>{product.categoryName}</h3>
						</section>

						<section className="detail-product-section">
							<h2>Reseñas:</h2>
							<h3>{product.rating}</h3>
						</section>

						<section className="detail-product-section">
							<div className="container-description">
								<h2>Descripción:</h2>
								<p className="detail-product-description">
									{product.description}
								</p>
							</div>
						</section>
					</div>
				</div>

				{/*//? Informacion general las ventas */}
				<div className="detail-product-sales">
					<h2>Informacion sobre el vendedor</h2>
					<section className="detail-product-section">
						<h2>Vendedor:</h2>
						<h3>{product.userName}</h3>
					</section>

					<section className="detail-product-section">
						<h2>Ubicación:</h2>
						<h3>{product.location}</h3>
					</section>

					<section className="detail-product-section">
						<h2>Unidades:</h2>
						<h3>{product.stock}</h3>
					</section>

					<button className="detail-product-btn">Comprar ahora!</button>
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;

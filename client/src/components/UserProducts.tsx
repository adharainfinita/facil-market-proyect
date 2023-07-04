import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store";
import { Product } from "../utils/interfaces";
import { Link } from "react-router-dom";

const UserProducts: React.FC = () => {
	const products = useSelector((state: RootState) => state.product.products);
	const userLogin = useSelector((state: RootState) => state.user.userLogin);
	const userProducts = products.filter(
		(product: Product) => product.userID === userLogin.user.id
	);

	return (
		<div className="conteiner-my-products">
			<h2>Mis Productos</h2>
			<div className="cards-cont">
				{userProducts.map((product, index) => {
					return (
						<div className="product-card">
								<img src={product.images[0]} alt={product.name} />
								<div className="text">
								<Link key={index} to={`/product/detail/${product.id}`} >
									<h3>{product.name}</h3>
									</Link>
									<div>
									<h1></h1>
									<Link key={index} to={`/product/edit/${product.id}`}>
										Editar
									</Link>
									</div>
								</div>
							</div>
					);
				})}
			</div>
		</div>
	);
};

export default UserProducts;

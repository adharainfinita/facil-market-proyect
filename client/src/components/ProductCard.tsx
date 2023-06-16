import { Link } from "react-router-dom";
import { Product } from "../utils/interfaces";
type productList = {
	products: Array<Product>;
};

function ProductCard(props: productList) {
	const products = props.products;
	return (
		<>
			<div className="cards-container">
				{products.map((product) => {
					return (
						<Link to={`/product/detail/${product.id}`}>
							<div key={product.id} className="product-card">
								<img src={product.image} alt={product.name} />
								<div className="text">
									<p>{product.categoryName}</p>
									<h3>{product.name}</h3>
									<h4>${product.price}</h4>
									<span>{product.location}</span>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}

export default ProductCard;

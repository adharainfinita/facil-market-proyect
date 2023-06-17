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
          const { id, image, name, categoryName, price, location } = product;
          return (
            <Link key={id} to={`/product/detail/${id}`}>
              <div key={id} className="product-card">
                <img src={image} alt={name} />
                <div className="text">
                  <p>{categoryName}</p>
                  <h3>{name}</h3>
                  <h4>${price.toLocaleString("es-AR", {minimumFractionDigits: 0,})}</h4>
                  <span>{location}</span>
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

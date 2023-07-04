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
    <div className="User__products">
      <div className="conteiner-my-products">
        <div className="conteiner2-my-products">
          <h2 className="myproducts__title">Mis Productos</h2>
          <div className="cards-cont">
            {userProducts.map((product, index) => {
              return (
                <Link key={index} to={`/product/edit/${product.id}`}>
                  <div className="product-card">
                    <img src={product.images[0]} alt={product.name} />
                    <div className="text">
                      <h3>{product.name}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to="/profile">
            <button className="userProduct__button">Volver al perfil</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
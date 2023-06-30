import React from "react";
import { useSelector  } from "react-redux";
import { RootState } from "../redux/store";

import { Link, useParams } from "react-router-dom";
import { Product } from "../utils/interfaces";

const UserProfiles: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const { id } = useParams();

  const userProfile = users.find((user) => user.id.toString() === id);


  const products = useSelector((state: RootState) => state.product.products);

  const userProducts = products.filter(
    (product: Product) => product.userID.toString() === id
  );
  

  return (
    <div className="Profile__conteiner">
      <div className="Profile__data">
      <img src={userProfile?.image} alt="user" className="nav__userLogo" />
        <h2>Nombre: {userProfile?.fullName}</h2>
        <h2>Email: {userProfile?.email}</h2>
      </div>
      <div className="Profile__buys">
        <h2>Mis Productos</h2>
        <div className="cards-cont">
          {userProducts.map((product, index) => {
            return (
              <Link key={index} to={`/product/detail/${product.id}`}>
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
      </div>
    </div>
  );
};

export default UserProfiles;



import useProduct from "../hooks/useProduct";

const DetailProduct = () => {
  const product = useProduct()
   
    return (
        <div>
            <div>
                <div>
                    <img src={product?.image} alt={product.name} />
                </div>
                <h1>{product?.name}</h1>
                <h1>{product?.price}</h1>
                <div>
                    <h2>{product.userName}</h2>
                    <h2>{product.nameCategory}</h2>
                    <h2>{product.stock}</h2>
                    <h2>{product.rating}</h2>
                    <h2>{product.location}</h2>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct;

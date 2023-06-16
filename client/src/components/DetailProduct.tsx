import useProduct from "../hooks/useProduct";

const DetailProduct = () => {
  const product = useProduct()
   
    return (
        <div className="detail-product-container">
            <div className="detail-product">
                <div className="detail-product-image">
                    <img src={product?.image} alt={product.name} />
                </div>
                <h1 className="detail-product-name">{product?.name}</h1>
                <h1 className="detail-product-price">{product?.price}</h1>
                <div className="detail-product-info">
                    <h2 className="detail-product-seller">{product.userName}</h2>
                    <h2 className="detail-product-category">{product.categoryName}</h2>
                    <h2>{product.stock}</h2>
                    <h2>{product.rating}</h2>
                    <h2>{product.location}</h2>
                    <p className="detail-product-description">{product.description}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct;

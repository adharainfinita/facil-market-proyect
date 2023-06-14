interface Product{
    id: number,
    title: string 
    price: number
    category: string
    description: string
    image: string
}

type productList = {
    products: Array<Product>
}

function ProductCard(props: productList) {
    const products =  props.products
    return(
       <>
       <div className="cards-container">
            {products.map((product) => {
            return(
            <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />
                <div className="text">
                    <p>{product.category}</p>
                    <h3>{product.title}</h3>
                    <h4>${product.price}</h4>
                    <span>Ubicación</span>
                </div>
            </div>
            )
            })}
       </div>
       </>
    )
  }
  
  export default ProductCard
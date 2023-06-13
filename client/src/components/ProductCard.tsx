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
       {products.map((product) => {
        return(
        <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <div>
                <h3>{product.title}</h3>
                <p>Location</p>
                <p>{product.category}</p>
                <h4>{product.price}</h4>
            </div>
        </div>
        )
        })}
       
       </>
    )
  }
  
  export default ProductCard
import { products } from "../utils/data"

function ProductCard() {
    
    return(
       <>
       {products.map((product) => {
        return(
        <div key={product.id}>
            <img src="https://gsmphone.co/wp-content/uploads/2022/12/iPhone14Pro-1_900x.webp" alt={product.nombre} />
            <div>
                <h3>{product.nombre}</h3>
                <p>Location</p>
                <div>
                    <p>{product.categoria}</p>
                </div>
                <h4>{product.precio}</h4>
            </div>
        </div>
        )
        })}
       
       </>
    )
  }
  
  export default ProductCard
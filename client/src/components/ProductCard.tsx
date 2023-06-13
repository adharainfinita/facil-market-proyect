function ProductCard() {
    
    return(
       <>
       <div>
        <img src="https://gsmphone.co/wp-content/uploads/2022/12/iPhone14Pro-1_900x.webp" alt="" />
        <div>
            <h3>Nombre del producto</h3>
            <div>
                <p>Categories</p>
            </div>
            <h4>$1.000</h4>
        </div>
       </div>
       {2+2 ? <div>
        <button>Active</button>
        </div> : ''}
       </>
    )
  }
  
  export default ProductCard
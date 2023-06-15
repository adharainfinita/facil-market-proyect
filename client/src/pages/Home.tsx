import { useEffect, useState } from "react";

/*Components*/
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/getTrendProducts";
import Banner from "../components/Banner";
import FeaturedCategory from "../components/FeaturedCategory";

interface Product{
    id: number,
    title: string 
    price: number
    category: string
    description: string
    image: string
}

function Home() {
    const [products, setProducts] = useState<Product[]>()
    useEffect(() => {
        const getList = async () =>{
            const data: Array<Product> = await getProducts()
            setProducts(data)
        }
        getList()
    }, [])
    
    return (
        <>
            <Banner />
            <FeaturedCategory />
            <h3 className="trend-title">Productos más vendidos</h3>
            {products ? <ProductCard products={products}/> : ''}

        </>
    );
  }
  
  export default Home;
  
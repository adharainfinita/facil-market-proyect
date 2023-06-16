import { useSelector } from "react-redux";

/*Components*/
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import FeaturedCategory from "../components/FeaturedCategory";
import { RootState } from "../redux/store";


function Home() {
    const products = useSelector((state: RootState) => state.product.originalCopy)

    const trendProducts = products.slice(0,6)
    
    return (
        <>
            <Banner />
            <FeaturedCategory />
            <h3 className="trend-title">Más vendidos</h3>
            {products ? <ProductCard products={trendProducts}/> : ''}

        </>
    );
  }
  
  export default Home;
  
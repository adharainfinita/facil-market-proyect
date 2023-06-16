import { useSelector } from "react-redux";

/*Components*/
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import FeaturedCategory from "../components/FeaturedCategory";
import { RootState } from "../redux/store";


function Home() {
    const products = useSelector((state: RootState) => state.product.originalCopy)

    const trendProducts = [...products].sort((a,b) => {
        if (a.rating > b.rating) {
            return -1; // Indica que a debe ser ordenado antes que b
          } else if (a.rating < b.rating) {
            return 1; // Indica que a debe ser ordenado después que b
          } else {
            return 0; // Los ratings son iguales, no se modifica el orden
          }
    }).slice(0, 6);
    
    return (
        <>
            <Banner />
            <FeaturedCategory />
            <h3 className="trend-title">Más vendidos</h3>
            {products ? 
            
            <ProductCard products={trendProducts}/> : ''}

        </>
    );
  }
  
  export default Home;
  
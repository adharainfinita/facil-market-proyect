import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../redux/features/productSlice";
import { getAllProducts } from "../services/productServices";

/*Components*/
import ProductCard from "../components/ProductCard";
//import Banner from "../components/Banner";
import FeaturedCategory from "../components/FeaturedCategory";
import { RootState } from "../redux/store";
import Slider from "../components/Slider";

function Home() {
	const dispatch = useDispatch();
	const products = useSelector(
		(state: RootState) => state.product.originalCopy
	);

	const images = [
		'https://colibriwp.com/blog/wp-content/uploads/2020/03/website-slider-1.png',
		'https://colibriwp.com/blog/wp-content/uploads/2020/03/colibri-slider.png',
		'https://www.socialworksocialwork.com/jpg/youre_a_slider_toni_inchoo.jpg'
	  ];

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await getAllProducts();
				if (response) {
					dispatch(getProducts(response));
				} else {
					console.error("No existen productos");
				}
			} catch (error) {
				console.error("Error al obtener los productos:", error);
			}
		};
		fetchProducts();
	}, [dispatch]);

	const trendProducts = [...products]
		.sort((a, b) => {
			if (a.rating > b.rating) {
				return -1; // Indica que a debe ser ordenado antes que b
			} else if (a.rating < b.rating) {
				return 1; // Indica que a debe ser ordenado después que b
			} else {
				return 0; // Los ratings son iguales, no se modifica el orden
			}
		})
		.slice(0, 6);

	return (
		<>
			{/* <Banner /> */}
			<Slider images={images}/>
			<h3 className="trend-title">Categorias destacadas</h3>
			<FeaturedCategory />
			<h3 className="trend-title">Más vendidos</h3>
			{products ? <ProductCard products={trendProducts} /> : ""}
		</>
	);
}

export default Home;

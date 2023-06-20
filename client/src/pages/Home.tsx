import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../redux/features/productSlice";
import { getAllProducts } from "../services/productServices";

/*Components*/
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import FeaturedCategory from "../components/FeaturedCategory";
import { RootState } from "../redux/store";

function Home() {
	const dispatch = useDispatch();
	const products = useSelector(
		(state: RootState) => state.product.originalCopy
	);

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
			<Banner />
			<h3 className="trend-title">Categorias destacadas</h3>
			<FeaturedCategory />
			<h3 className="trend-title">Más vendidos</h3>
			{products ? <ProductCard products={trendProducts} /> : ""}
		</>
	);
}

export default Home;

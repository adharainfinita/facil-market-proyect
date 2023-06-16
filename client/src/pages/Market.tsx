//import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getAllProducts } from "../redux/features/productSlice";

//import SearchBar from "../components/SearchBar";
import { RootState } from "../redux/store";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import { getProducts } from "../redux/features/productSlice";
import { getAllProducts } from "../services/productServices";
/* import { getProducts } from "../services/getTrendProducts"; */
import { useEffect } from "react"

function Market() {
	const dispatch = useDispatch()
	const products = useSelector((state: RootState) => state.product.products);

	useEffect(() => {
		// Aquí llamamos al servicio getCategory para obtener las categorías
		const fetchCategories = async () => {
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
		fetchCategories();
	}, [dispatch]);


	return (
		<>
			<Filters />
			<Pagination products={products} />
		</>
	);
}

export default Market;

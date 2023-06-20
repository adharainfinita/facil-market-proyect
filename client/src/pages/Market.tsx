import { useSelector } from "react-redux";
import { getAllProducts } from "../redux/features/productSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import { useEffect } from "react";
import { getProducts } from "../redux/features/productSlice";

function Market() {
	const products = useSelector((state: RootState) => state.product.products);
	const dispatch = useDispatch();

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

	return (
		<>
			<Filters />
			<Pagination products={products} />
		</>
	);
}

export default Market;

//import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getAllProducts } from "../redux/features/productSlice";

//import SearchBar from "../components/SearchBar";
import { RootState } from "../redux/store";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
/* import { getProducts } from "../services/getTrendProducts";
import { useEffect } from "react" */

function Market() {
	const dispatch = useDispatch()
	const products = useSelector((state: RootState) => state.product.products);

	/* useEffect(() => {
		dispatch(getProducts(data))
	},[getProducts]); */


	return (
		<>
			<Filters />
			<Pagination products={products} />
		</>
	);
}

export default Market;

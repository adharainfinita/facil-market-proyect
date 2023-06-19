//import { useEffect } from "react";
import {useSelector } from "react-redux";
//import { getAllProducts } from "../redux/features/productSlice";

//import SearchBar from "../components/SearchBar";
import { RootState } from "../redux/store";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
/* import { getProducts } from "../services/getTrendProducts"; */


function Market() {

	const products = useSelector((state: RootState) => state.product.products);



	return (
		<>
			<Filters />
			<Pagination products={products} />
		</>
	);
}

export default Market;

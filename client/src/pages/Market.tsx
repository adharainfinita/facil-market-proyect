//import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

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

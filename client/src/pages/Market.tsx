import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

function Market() {
	const products = useSelector((state: RootState) => state.product.products);

	const productsAuth = products.filter((product) => product.active === true)
	return (
		<>
			<Filters />
			<Pagination products={productsAuth} />
		</>
	);
}

export default Market;

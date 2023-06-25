import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../utils/interfaces";

type productList = {
	products: Array<Product>;
};

function Pagination(props: productList) {
	const products = props.products;

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage] = useState(6); //se modifico
	const [_find, setFind] = useState<boolean>(); //se modifico

	useEffect(() => {
		setCurrentPage(1);
		if (products.length === 0) setFind(false);
		if (products.length > 0) setFind(true);
	}, [products]);

	const pagesNumber = Math.ceil(products.length / perPage);

	const lastPage = currentPage * perPage;
	const firstPage = lastPage - perPage;
	const currentProducts = products.slice(firstPage, lastPage);

	const onPreviusPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const onNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const onSpecificPage = (page: string) => {
		if (page === "first") return setCurrentPage(1);
		return setCurrentPage(pagesNumber);
	};

	return (
		<>
			{currentProducts.length === 0 && <p>No se encontraron productos con estas características</p>}
			<ProductCard products={currentProducts} />
			<div className="page-controls">
				<button
					className="pag-buttons"
					disabled={currentPage === 1 || currentPage < 1}
					onClick={() => onSpecificPage("first")}
				>
					{"<<"}
				</button>
				<button
					className="pag-buttons"
					disabled={currentPage === 1 || currentPage < 1}
					onClick={onPreviusPage}
				>
					{"<"}
				</button>
				<h3>
					Page {currentPage} of {pagesNumber}
				</h3>
				<button
					className="pag-buttons"
					disabled={currentPage === pagesNumber || currentPage > pagesNumber}
					onClick={onNextPage}
				>
					{">"}
				</button>
				<button
					className="pag-buttons"
					disabled={currentPage === pagesNumber || currentPage > pagesNumber}
					onClick={() => onSpecificPage("last")}
				>
					{">>"}
				</button>
			</div>
		</>
	);
}

export default Pagination;

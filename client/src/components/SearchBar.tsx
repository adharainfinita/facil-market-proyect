import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchedProducts } from "../redux/features/productSlice";
import { getProductsByName } from "../services/productServices";
import { SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSearch = async () => {
		try {
			const filteredProducts = await getProductsByName(searchTerm);
			if (filteredProducts.length === 0) {
				setError(`No se encontro: ${searchTerm}`);
				dispatch(getSearchedProducts(filteredProducts));
			} else {
				setError("");
				dispatch(getSearchedProducts(filteredProducts));
			}
			setSearchTerm("");
			navigate("/products");
		} catch (error) {
			console.error("Ocurrio un error durante la busqueda", error);
		}
		setSearchTerm("");
	};

	return (
		<div className="wrap">
			<div className="search">
				<input
					type="text"
					className="search__term"
					placeholder="¿Qué estás buscando?"
					value={searchTerm}
					onChange={handleChange}
				/>
				<button type="submit" className="search__button" onClick={handleSearch}>
					<SlMagnifier />
				</button>
			</div>
			{error && <div>{error}</div>}
		</div>
	);
};

export default SearchBar;

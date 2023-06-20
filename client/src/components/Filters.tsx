import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
	filterProductsByCategory,
	filterProductsByLocation,
	orderProducts,
	resetFilters,
} from "../redux/features/productSlice";

const Filters = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state: RootState) => state.category.value);

	/* const products = useSelector(
    (state: RootState) => state.product.products
  ); */
	const productsCopy = useSelector(
    (state: RootState) => state.product.originalCopy
  );

	const uniqueLocations = [...new Set(productsCopy.map((product: any) => product.location))];
	
	const handleProductFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === "forCategory") {
			dispatch(filterProductsByCategory(value));
		}
		if (name === "forLocation") {
			dispatch(filterProductsByLocation(value));
		}
	};
	const resetAllFilters = () => {
		dispatch(resetFilters());

		// Restablecer los valores predeterminados en los selectores
		const categorySelect = document.getElementsByName(
			"forCategory"
		)[0] as HTMLSelectElement;
		categorySelect.selectedIndex = 0;

		const locationSelect = document.getElementsByName(
			"forLocation"
		)[0] as HTMLSelectElement;
		locationSelect.selectedIndex = 0;
	};
	const handleOrderProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(orderProducts(event.target.value));
	};

	return (
		<div className="filters-container">
			<section className="filter-group">
				<h3 className="filter-title">FILTRAR</h3>
				<label htmlFor="forCategory">Por categoría:</label>
				<select
					name="forCategory"
					className="filter-select"
					onChange={handleProductFilter}
				>
					<option value="All">Todas las categorías</option>
					{categories.map((category: any) => (
						<option key={category.name} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
				<label htmlFor="forLocation">Por locación:</label>
				<select
					name="forLocation"
					className="filter-select"
					onChange={handleProductFilter}
				>
					<option value="All">Default</option>
					{uniqueLocations.map((location: string, index: number) => (
						<option key={index} value={location}>
							{location}
            </option>
          ))}
				</select>
				<button type="button" onClick={resetAllFilters}>
					Reiniciar
				</button>
			</section>

			<section>
				<h3 className="filter-title">ORDENAR</h3>
				<label htmlFor="orderBy">Por precio:</label>
				<select
					name="orderBy"
					className="filter-select"
					onChange={handleOrderProduct}
				>
					<option value="All">Default</option>
					<option value="MAX">Precio más alto</option>
					<option value="MIN">Precio más bajo</option>
				</select>
				<label htmlFor="forName">Por nombre:</label>
				<select
					name="forName"
					className="filter-select"
					onChange={handleOrderProduct}
				>
					<option value="All">Default</option>
					<option value="A">A-Z</option>
					<option value="D">Z-A</option>
				</select>
			</section>
		</div>
	);
};

export default Filters;

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
	filterProductsByCategory,
	filterProductsByUser,
	filterProductsByLocation,
	orderProducts,
	resetFilters,
} from "../redux/features/productSlice";

const Filters = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state: RootState) => state.category.value);
	// estoy usando la copia
	const products = useSelector(
		(state: RootState) => state.product.originalCopy
	);
	const users = useSelector((state: RootState) => state.user.users);

	const handleProductFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === "forCategory") {
			dispatch(filterProductsByCategory(value));
		}
		if (name === "forUser") {
			dispatch(filterProductsByUser(value));
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
				<h3 className="filter-title">Filtros</h3>
				<label htmlFor="forCategory">Por categoría:</label>
				<select
					name="forCategory"
					className="filter-select"
					onChange={handleProductFilter}
					defaultValue={"All"}
				>
					<option value="All">Todas</option>
					{categories.map((category: any) => (
						<option key={category.name} value={category.name}>
							{category.name}
						</option>
					))}
			</select>
					<label htmlFor="forUser">Por usuario:</label>
				<select
					name="forUser"
					className="filter-select"
					onChange={handleProductFilter}
					defaultValue={"All"}
				>
					<option value="All">Default</option>
					{users.map((user: any, index: number) => (
						<option key={index} value={user.name} >
							{user.name}
						</option>
					))}
				</select>
				<label htmlFor="forLocation">Por locación:</label>
				<select
					name="forLocation"
					className="filter-select"
					onChange={handleProductFilter}
					defaultValue={"All"}
				>
					<option value="All">Default</option>
					{products.map((product: any, index: number) => (
						<option key={index} value={product.location}>
							{product.location}
						</option>
					))}
				</select>
				<button type="button" onClick={resetAllFilters} className="reset-filters">Borrar</button>
			</section>


			<section className="order-group">
				<h3 className="filter-title">Ordenar</h3>
				<label htmlFor="forPrice">Por precio:</label>
				<select
					name="forPrice"
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

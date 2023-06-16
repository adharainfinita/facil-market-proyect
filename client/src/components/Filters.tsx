import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Filters = () => {
	const categories = useSelector((state: RootState) => state.category.value);

	return (
		<div>
			<h3>Filtros</h3>
			{categories.map((categorie) => {
				return (
					<>
						<input type="radio" value={categorie.name} name={categorie.name} />
						{categorie.name}
					</>
				);
			})}
		</div>
	);
};

export default Filters;

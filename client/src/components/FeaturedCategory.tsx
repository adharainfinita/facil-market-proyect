import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Category } from "../utils/interfaces";

const FeaturedCategory = () => {
	const categories = useSelector((state: RootState) => state.category.value);
	const featured = categories.slice(0, 5);
	return (
		<div className="container-featured">
			{featured.map(
				(category: Category, index: number) =>
					// Verificar si category.highlight es true
					category.highlight && (
						<div key={index} className="container-featuredcategory">
							<img src={category.image} alt={category.name} />
							<h2>{category.name}</h2>
						</div>
					)
			)}
		</div>
	);
};

export default FeaturedCategory;

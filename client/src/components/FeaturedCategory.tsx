import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Category } from "../utils/interfaces";
import { filterProductsByCategory } from "../redux/features/productSlice";
import { useNavigate } from "react-router-dom";

const FeaturedCategory = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state: RootState) => state.category.value);
	const featured = categories.slice(0, 5);
	const navigate = useNavigate()

	const filterFeaturedCategory = (category: string) => {
		dispatch(filterProductsByCategory(category))
		navigate('/products')
	}

	return (
		<div className="container-featured">
			{featured.map(
				(category: Category, index: number) =>
					// Verificar si category.highlight es true
					category.highlight && (
						<div key={index} className="container-featuredcategory" 
						onClick={() => filterFeaturedCategory(category.name)}>
							<img src={category.image} alt={category.name} />
							<h2>{category.name}</h2>
						</div>
					)
			)}
		</div>
	);
};

export default FeaturedCategory;

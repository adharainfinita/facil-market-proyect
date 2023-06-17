import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getAllCategory } from "../services/categoryServices";
import { getCategories } from "../redux/features/categorySlice";
import {
  filterProducts,
  orderProducts,
  filterByLocation,
} from "../redux/features/productSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.value);
  const products = useSelector((state: RootState) => state.product.products);
  const [locations, setLocations] = useState<string[]>([]);
  console.log(locations);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategory();
      dispatch(getCategories(data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Extract unique locations from products
    const uniqueLocations = Array.from(
      new Set(products.map((product) => product.location))
    );
    setLocations(uniqueLocations);
  }, [products]);

  const handleCategoryFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    dispatch(filterProducts(selectedValue));
  };

  const handleOrderFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    dispatch(orderProducts(selectedValue));
  };

  const handleLocationFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    dispatch(filterByLocation(selectedValue));
  };

  return (
    <div className="filters-container">
      <h3 className="filter-title">Filtros</h3>
      <div className="filter-group">
        <label htmlFor="category-filter">Categoría:</label>
        <select
          id="category-filter"
          onChange={handleCategoryFilter}
          className="filter-select"
        >
          <option value="All">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="order-filter">Ordenar por:</label>
        <select
          id="order-filter"
          onChange={handleOrderFilter}
          className="filter-select"
        >
          <option value="All">Default</option>
          <option value="MAX">Precio más alto</option>
          <option value="MIN">Precio más bajo</option>
        </select>
        <div className="search-by-location">
          <label htmlFor="location-filter">Buscar por:</label>
          <select
            id="location-filter"
            onChange={handleLocationFilter}
            className="filter-select"
          >
            <option value="All">Default</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;

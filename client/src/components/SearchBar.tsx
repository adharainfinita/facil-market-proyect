import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchedProducts } from '../redux/features/productSlice';
import { getProductsByName } from '../services/productServices';
const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    const filteredProducts = await getProductsByName(searchTerm);

    dispatch(getSearchedProducts(filteredProducts));
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;

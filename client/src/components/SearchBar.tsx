import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchedProducts } from '../redux/features/productSlice';
import { getProductsByName } from '../services/productServices';
import {SlMagnifier} from "react-icons/sl"
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    const filteredProducts = await getProductsByName(searchTerm);

    if(filteredProducts.length > 0){
      dispatch(getSearchedProducts(filteredProducts));
      setSearchTerm('')
      navigate('/products')
    }
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
    </div>
  );
};

export default SearchBar;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/features/productSlice";

import SearchBar from "../components/SearchBar";
import { RootState } from "../redux/store";
import Pagination from "../components/Pagination";

function Market() {
    const dispatch = useDispatch()
    const products = useSelector((state: RootState) => state.product.products);

    useEffect(() =>{
            dispatch(getAllProducts())
    }, [dispatch])

    return (
        <>
         <Pagination products={products}/>
         <SearchBar />
        </>
    );
  }
  
  export default Market;    
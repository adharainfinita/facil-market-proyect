import { Route, Routes } from "react-router-dom";

import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import Form from "./components/FormCreateProduct";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./components/RegisterForm";
import DetailProduct from "./components/DetailProduct";
import Market from "./pages/Market";
import UserProfile from "./pages/UserProfile";
import { getUsers } from "./redux/features/userSlice";
import { getAllUsers, postUser } from "./services/userServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "./redux/features/categorySlice";
import { getCategory } from "./services/categoryServices";
import { getAllProducts, postProduct } from "./services/productServices";
import { getProducts } from "./redux/features/productSlice";

function App() {
	const dispatch = useDispatch();
	
	useEffect(() => {
		const fetchUsers = async() =>{
			try {
				const response = await getAllUsers()
					if(response) {
						dispatch(getUsers(response));
					}
			} catch (error) {
				console.log(error);
			}
		}
		fetchUsers();
	}, [dispatch, postUser, getAllUsers]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await getAllProducts();
				if (response) {
					dispatch(getProducts(response));
				} else {
					console.error("No existen productos");
				}
			} catch (error) {
				console.error("Error al obtener los productos:", error);
			}
		};
		fetchProducts();
	}, [dispatch, postProduct, getAllProducts]);
		
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await getCategory();
				if (response) {
					dispatch(getCategories(response));
				} else {
					console.error("No existen categorias");
				}
			} catch (error) {
				console.error("Error al obtener las categorías:", error);
			}
		};
		fetchCategories();
	}, [dispatch, getCategory]);


	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/vender" element={<Form />} />
				<Route path="/terminos_y_condiciones" element={<Terms />} />
				<Route path="/profile" element={<UserProfile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/products" element={<Market />} />
				<Route path="/product/detail/:id" element={<DetailProduct />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
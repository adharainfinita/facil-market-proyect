import { Route, Routes } from "react-router-dom";

import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import Form from "./components/FormCreateProduct";
import Footer from "./components/Footer";
import VerificationPage from "./pages/VerificationPage";
import Login from "./pages/Login2";
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import DetailProduct from "./components/DetailProduct";
import Market from "./pages/Market";
import { getUsers } from "./redux/features/userSlice";
import { getAllUsers } from "./services/userServices";
import UserProfile from "./pages/UserProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "./redux/features/categorySlice";
import { getCategory } from "./services/categoryServices";

/* import { getAllProducts, postProduct } from "./services/productServices";
import { getProducts } from "./redux/features/productSlice"; */

function App() {
	const dispatch = useDispatch();

	interface Token {
		token: string;
		email: string;
		password: string;
	}

	useEffect(() => {
		return () => {
			// Obtiene el valor del token almacenado en el local storage
			const response = localStorage.getItem("token");

			// Parsea el valor del token en un objeto JavaScript
			if (response) {
				const info: Token = JSON.parse(response);
				
				if(info.token && info.email && info.password){
					
				}
			}
		};
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getAllUsers();
				if (response) {
					dispatch(getUsers(response));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchUsers();
	}, [dispatch]);

	useEffect(() => {
		/* const fetchUsers = async() =>{
			try {
				const response = await getAllUsers()
					if(response) {
						dispatch(getUsers(response));
					}
			} catch (error) {
				console.log(error);
			}
		}
		fetchUsers(); */

		/* const fetchProducts = async () => {
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
		fetchProducts(); */
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
	}, [dispatch]);

	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/vender" element={<Form />} />
				<Route path="/terminos_y_condiciones" element={<Terms />} />
				<Route path="/profile" element={<UserProfile />} />
				<Route path="/verification" element={<VerificationPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/products" element={<Market />} />
				<Route path="/product/detail/:id" element={<DetailProduct />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;

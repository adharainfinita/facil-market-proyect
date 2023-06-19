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

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "./redux/features/categorySlice";
import { getCategory } from "./services/categoryServices";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// Aquí llamamos al servicio getCategory para obtener las categorías
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

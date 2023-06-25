const URL_HOST = import.meta.env.VITE_HOST;
import { Route, Routes } from "react-router-dom";
import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import FormCreateProduct from "./components/FormCreateProduct";
import Footer from "./components/Footer";
import VerificationPage from "./pages/VerificationPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import DetailProduct from "./components/DetailProduct";
import Market from "./pages/Market";
import {
	changePassword,
	getUsers,
	userLogin,
	changeEmail,
	changeName,
	changeImage,
} from "./redux/features/userSlice";
import { getAllUsers } from "./services/userServices";
import UserProfile from "./pages/UserProfile";
import { useEffect } from "react";
import { getCategories } from "./redux/features/categorySlice";
import { getCategory } from "./services/categoryServices";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUserById } from "./services/userServices";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./services/productServices";
import { getProducts } from "./redux/features/productSlice";

import axios from "axios";

function App() {
	const dispatch = useDispatch();
	const session = window.localStorage.getItem("token");

	const headers = {
		Authorization: `Bearer ${session}`,
	};

	const userLogin2 = useSelector((state: RootState) => state.user.userLogin);
	const userId = userLogin2.user.id;
	useEffect(() => {
		const fetchUserData = async () => {
			const userId2 = userId; // Reemplaza con el ID del usuario deseado
			const fetchedUser = await getUserById(userId2);

			if (fetchedUser) {
				if (fetchedUser.image !== undefined) {
					const newImg = fetchedUser.image;
					dispatch(changeImage(newImg));
				}
				if (fetchedUser.fullName !== undefined) {
					const newName = fetchedUser.fullName;
					dispatch(changeName(newName));
				}
				if (fetchedUser.email !== undefined) {
					const newEmail = fetchedUser.email.toString(); // Convertir a cadena
					dispatch(changeEmail(newEmail));
				}
				if (fetchedUser.password !== undefined) {
					const newPassword = fetchedUser.password.toString(); // Convertir a cadena
					dispatch(changePassword(newPassword));
				}
			}
		};

		fetchUserData();
	}, [userId]);

	useEffect(() => {
		if (session) {
			axios
				.get(`${URL_HOST}/token`, { headers })
				.then((response) => {
					const data = {
						id: response.data.user.id,
						fullName: response.data.user.fullName,
						email: response.data.user.email,
						image: response.data.user.image,
					};

					dispatch(userLogin(data));
				})
				.catch((error) => {
					//? mejorar este error
					console.log(error);
				});
		}
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
			fetchUsers();
		}
	}, []);

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
	}, [dispatch, getAllProducts]);

	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/vender" element={<FormCreateProduct />} />
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

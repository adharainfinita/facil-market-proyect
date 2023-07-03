import axios from "axios";
const URL_HOST = import.meta.env.VITE_HOST;
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Pages
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import VerificationPage from "./pages/VerificationPage";
import Home from "./pages/Home";
// import UserProducts from "./pages/UserProducts";
// Dashboard Admin
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

// Components
import Navbar from "./components/Navbar";
import FormCreateProduct from "./components/FormCreateProduct";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
// redux/services
import { RootState } from "./redux/store";
import { getAllProducts } from "./services/productServices";
import { getProducts } from "./redux/features/productSlice";
import RegisterForm from "./components/RegisterForm";
import DetailProduct from "./components/DetailProduct";
import Market from "./pages/Market";
import UserProfiles from "./components/UsersProfiles";
import ProductReviews from "./pages/ProductsReviews";
import {
	changePassword,
	getUsers,
	userLogin,
	changeEmail,
	changeName,
	changeImage,
} from "./redux/features/userSlice";
import { getAllUsers, getUserById } from "./services/userServices";
import { getCategories } from "./redux/features/categorySlice";
import { getCategory } from "./services/categoryServices";
import UserProfile from "./components/UserProfile";
import EditUser from "./pages/admin/EditUser";
import Products from "./pages/admin/Products";
import Resume from "./pages/admin/Resume";
import UserProducts from "./components/UserProducts";
import ProductEdit from "./components/ProductEdit";
import NotFound from "./errors/NotFound";
import ShoppingHistory from "./components/Shoppinghistory";
import Cart from "./pages/cart/Cart";
import { startCart } from "./redux/features/cartSlice";
import { addItem } from "./services/cartServicer";
// import Cart from "./pages/Cart/Cart"
import About from "./components/About/About";

const App = () => {
	const dispatch = useDispatch();
	const session = window.localStorage.getItem("token");

	const headers = {
		Authorization: `Bearer ${session}`,
	};

  const login = useSelector((state: RootState) => state.user.userLogin);
  const permissions = login?.user?.admin;

  const id = login.user.id;

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = id; // Reemplaza con el ID del usuario deseado
      const fetchedUser = await getUserById(userId);

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
  }, [dispatch, id]);

  useEffect(() => {
    if (session) {
      axios
        .get(`${URL_HOST}/auth/token`, { headers })
        .then((response) => {
          const data = {
            id: response.data.user.id,
            fullName: response.data.user.fullName,
            email: response.data.user.email,
            image: response.data.user.image,
            admin: response.data.user.admin,
          };
        const fetchCart = async () => {
          const result = await addItem(Number(id), []);
          dispatch(startCart(result));
          dispatch(userLogin(data));
        }
        fetchCart()
        })
        .catch((error) => {
          //? mejorar este error
          console.log(error);
        });
    }
  }, [dispatch, session]);

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
	}, [dispatch]);

	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/vender" element={<FormCreateProduct />} />
				<Route path="/terminos_y_condiciones" element={<Terms />} />

        <Route
          element={
            <ProtectedRoute isAllowed={Boolean(session)} redirectTo="/" />
          }
        >
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/compras" element={<ShoppingHistory />} />
          <Route path="/ventas" element={<UserProducts />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/user/:id" element={<EditUser />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/admin" element={<Dashboard />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={Boolean(session) && permissions}
              redirectTo="/admin"
            >
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="summary" element={<Resume />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route path="/products" element={<Market />} />
        <Route path="/product/detail/:id" element={<DetailProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile/:id" element={<UserProfiles />} />
        <Route path="/review/:id" element={<ProductReviews />} />
					<Route path="/admin" element={<Dashboard />}>
						<Route path="/admin/summary" element={<Resume />} />
						<Route path="users" element={<Users />} />
						<Route path="products" element={<Products />} />
					</Route>
				</Route>

				<Route path="/about" element={<About />} />
				<Route path="/admin/summary" element={<Resume />} />
				<Route path="/products" element={<Market />} />
				<Route path="/product/detail/:id" element={<DetailProduct />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/profile/:id" element={<UserProfiles />} />
				<Route path="/review/:id" element={<ProductReviews />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

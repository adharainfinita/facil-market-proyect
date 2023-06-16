
import { Route, Routes } from "react-router-dom";
import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import Form from "./pages/Form";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./components/RegisterForm";
import DetailProduct from "./components/DetailProduct";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "./redux/features/userSlice";
import { getProducts } from "./redux/features/productSlice";
import Market from "./pages/Market";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      fetch(`http://localhost:3001/user`)
       .then(response => response.json())
       .then(data => dispatch(getUsers(data)))

      fetch(`http://localhost:3001/product`)
       .then(response => response.json())
       .then(data => dispatch(getProducts(data)))
       }
       catch (error) {
       console.log(error);
   } })

  return (
    <>
      <Navbar />


      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/vender" element={<Form />} />
        <Route path="/terminos_y_condiciones" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/products" element={<Market/>} />
        <Route path="/product/detail/:id" element={<DetailProduct/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

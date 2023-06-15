
import { Route, Routes } from "react-router-dom";
import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import Form from "./pages/Form";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import FeaturedCategory from "./components/FeaturedCategory";
import Register from "./components/RegisterForm";


function App() {
  return (
    <>
      <Navbar />


      <Routes>
      <Route path="/catagorias" element={<FeaturedCategory/>} />
      <Route path="/catagorias" element={<Banner/>} />
      <Route path="/" element={<Home/>} />
        <Route path="/vender" element={<Form />} />
        <Route path="/terminos_y_condiciones" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;

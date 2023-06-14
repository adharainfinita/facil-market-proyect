
import { Route, Routes } from "react-router-dom";
import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import Form from "./pages/Form";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import FeaturedCategory from "./components/FeaturedCategory";
function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <FeaturedCategory />

      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/vender" element={<Form />} />
        <Route path="/terminos_y_condiciones" element={<Terms />} />
        <Route path="/login" element={<Login />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;

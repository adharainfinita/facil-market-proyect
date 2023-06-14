import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Terms from "./pages/Terms";
import Navbar from "./components/Navbar";
import Form from "./pages/Form";
import Login from "./pages/Login"
import Banner from "./components/Banner";
import FeaturedCategory from "./components/FeaturedCategory";
function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <FeaturedCategory />

      <Routes>
        <Route path="/vender" element={<Form />} />
        <Route path="/terminos_y_condiciones" element={<Terms />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

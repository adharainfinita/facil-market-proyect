import Footer from "./components/Footer"
import { Route, Routes } from "react-router-dom";
import Terms from "./components/Terms";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
function App() {
  return (
    <>
     <Navbar />

    <Routes>
<Route path="/terminos_y_condiciones" element={<Terms/>} />
<Route path="/" element={<Home/>} />

    </Routes>     
    <Footer/>
    </>
  );
}

export default App;

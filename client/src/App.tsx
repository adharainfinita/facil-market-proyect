import Footer from "./components/Footer"
import { Route, Routes } from "react-router-dom";
import Terms from "./components/Terms";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
     <Navbar />

    <Routes>
<Route path="/terminos_y_condiciones" element={<Terms/>} />

  </Routes>     
  <Footer/>
    </>
  );
}

export default App;

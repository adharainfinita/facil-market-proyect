import Footer from "./components/Footer"
import { Route, Routes } from "react-router-dom";
import Terms from "./components/Terms";

function App() {
  return (
    <>
    <Routes>

    <Route path="/" element={<Footer/>} />
    <Route path="/terminos_y_condiciones" element={<Terms/>} />
      </Routes>
    </>
  );
}

export default App;


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";  
import AddressForm from "./components/AddresForm";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/address/new" element={<AddressForm />} />
        <Route path="/address/edit/:id" element={<AddressForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

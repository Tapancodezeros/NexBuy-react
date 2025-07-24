import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import  About  from "./Pages/About";
import Product from "./Pages/Product";
import AddProduct from "./Pages/AddProduct";
import Profile from "./Pages/Profile";
import { ToastContainer } from "react-toastify";
function App() {
    return (
        <Router>
            <ToastContainer position="top-right"/>
            <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />  {/* Add more routes for the app here */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/product" element={<Product />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/profile" element={<Profile/>}/>
                {/* Add more routes as needed */}
            </Routes>
            
        </Router>
    );
}

export default App;

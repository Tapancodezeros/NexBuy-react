import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Main/Home";
import Contact from "../Pages/User/Contact";
import  About  from "../Pages/User/About";
import Product from "../Pages/Product/Product";
import AddProduct from "../Pages/Product/AddProduct";
import Profile from "../Pages/User/Profile";
import SingleProduct from "../Pages/Product/SingleProduct";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Performance from "../Pages/Performance";
import ManageShop from "../Pages/ManageShop";
const AppRoutes=() =>{
  return(
    
    <BrowserRouter>
    <Header/>
    <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/performance" element={<Performance/>}/>
        <Route path="/manageshop" element={<ManageShop/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  );

};

export default AppRoutes;
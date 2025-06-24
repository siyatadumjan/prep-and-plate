import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Profile from "./pages/Account/Profile";
import OrderHistory from "./pages/Account/OrderHistory";
import Deliveries from "./pages/Account/Deliveries";
import PaymentMethods from "./pages/Account/PaymentMethods";
import Address from "./pages/Account/Address";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/orders" element={<OrderHistory />} />
            <Route path="/account/deliveries" element={<Deliveries />} />
            <Route path="/account/payment-methods" element={<PaymentMethods />} />
            <Route path="/account/address" element={<Address />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

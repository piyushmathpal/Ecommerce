import React from "react";
import Nav_bar from "./components/Nav_bar";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { Route, Router ,Routes} from "react-router-dom";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import ItemPage from "./pages/ItemPage";

import LoginPage from "./pages/LoginPage";
import PhoneNumber from "./pages/PhoneNumber";
const App = () => {
  return (
    <>
      <Nav_bar></Nav_bar>
      <Routes>

      <Route exact path="/"  element={<HomePage/>}> </Route>
      <Route exact path="/cart" element={<CartPage/>} />
      <Route exact path="/login" element={<LoginPage/>} />
      <Route  path="/item/:productId" element={<ItemPage/>} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/signup/phonenumber" element={<PhoneNumber/>} />
      </Routes>
    </>
  );
};

export default App;

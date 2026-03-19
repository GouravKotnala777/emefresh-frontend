import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Home from './pages/Home.page.tsx';
import Header from "./components/Header.component.tsx";
import { useEffect, useState } from "react";
import SingleFruit from "./pages/SingleFruit.tsx";
import Register from "./pages/Register.page.tsx";
import Login from "./pages/Login.page.tsx";
import CreateProduct from "./pages/CreateProduct.page.tsx";
import SingleProduct from "./pages/SingleProduct.tsx";
import Cart from "./pages/Cart.page.tsx";
import AllProducts from "./pages/AllProducts.page.tsx";
import UpdateProduct from "./pages/UpdateProduct.page.tsx";
import Checkout from "./pages/Checkout.page.tsx";
import MyOrders from "./pages/MyOrders.page.tsx";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [screenWidth, setScreenWidth] = useState(0);
  //const [user] = useState<UserTypes|null>(null);

  function resizeHandler() {
    const screenWidthValue = window.innerWidth;
    setScreenWidth(screenWidthValue);
  };

  //async function myProfileHandler() {
  //  const res = await myProfile();
  //  if (res.success) {
  //    setUser(res.jsonData);
  //  }
  //}
  

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (!screenWidth) {
      resizeHandler();
    }

    window.addEventListener("resize", resizeHandler);

    return() => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (

    <BrowserRouter>
      <Header screenWidth={screenWidth} />
      <main className="max-w-3xl mx-auto">
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all_products" element={<AllProducts />} />
            <Route path="/single_fruit/:fruit_name/:productID" element={<SingleFruit />} />
            <Route path="/single_product/:productID" element={<SingleProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create_product" element={<CreateProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/update_product" element={<UpdateProduct />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my_orders" element={<MyOrders />} />
        </Routes>
      </main>
    </BrowserRouter>

  )
}

export default App

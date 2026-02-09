import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home.page.tsx';
import Header from "./components/Header.component.tsx";
import { useEffect, useState } from "react";
import SingleFruit from "./pages/SingleFruit.tsx";
import Register from "./pages/Register.page.tsx";
import Login from "./pages/Login.page.tsx";
import { myProfile, type UserTypes } from "./apis/userApi.ts";


function App() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [user, setUser] = useState<UserTypes|null>(null);

  function resizeHandler() {
    const screenWidthValue = window.innerWidth;
    setScreenWidth(screenWidthValue);
  };

  async function myProfileHandler() {
    const res = await myProfile();
    if (res.success) {
      setUser(res.jsonData);
    }
  }

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
      <main className="border bg-neutral-400 border-red-500 max-w-3xl mx-auto">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/single_fruit/:fruit_name/:productID" element={<SingleFruit />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        <pre>{JSON.stringify(user)}</pre>
      </main>
    </BrowserRouter>

  )
}

export default App

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home.page.tsx';
import Header from "./components/Header.component.tsx";
import { useEffect, useState } from "react";
import SingleFruit from "./pages/SingleFruit.tsx";


function App() {
  const [screenWidth, setScreenWidth] = useState(0);

  function resizeHandler() {
    const screenWidthValue = window.innerWidth;
    setScreenWidth(screenWidthValue);
  };

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
        </Routes>
      </main>
    </BrowserRouter>

  )
}

export default App

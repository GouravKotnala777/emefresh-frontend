import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";



function useCart() {
    const context = useContext(CartContext);

    if (!context) throw Error("context is undefiend");

    return context;    
};

export default useCart;
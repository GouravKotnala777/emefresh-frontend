import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";


export type ProductType = {_id:string; name:string; price:number; image:string;};
export type CartItemType = {_id:string; name:string; price:number; image:string; quantity:number;};
interface CartContextType{
    cart:CartItemType[];
    setCart:Dispatch<SetStateAction<CartItemType[]>>;
    totalCartItems:number;
    totalCartValue:number;
    addToCart:(product:CartItemType|null)=>void;
    removeFromCart:(product:CartItemType)=>void;
};

export const CartContext = createContext<CartContextType|null>(null);

export function CartProvider({children}:{children:ReactNode;}){
    const [cart, setCart] = useState<CartItemType[]>(JSON.parse(localStorage.getItem("cart")||"[]") as CartItemType[]);
    const [totalCartItems, setTotalCartItems] = useState<number>(0);
    const [totalCartValue, setTotalCartValue] = useState<number>(0);

    
    function addToCart(product:CartItemType|null) {
        if (!product || !product._id) throw new Error("productID is undefined");
        setCart((prev) => {
            let cartData:CartItemType[] = [];
            const existing = prev.find((p) => p._id === product._id);
            
            if (existing) {
                const updatedCart = prev.map((p) => (p._id === product._id) ? ({...p, quantity:p.quantity+product.quantity}) : (p));
                cartData = updatedCart;
            }
            else{
                const updatedCart = [...prev, product];
                cartData = updatedCart;
            }
            localStorage.setItem("cart", JSON.stringify(cartData));
            return cartData;
        });
    };
    

    function removeFromCart(product:CartItemType) {
        const selectedProduct = cart.find((p) => p._id === product._id);
        
        if (!selectedProduct) throw Error("selectedProduct not found");

        let cartData:CartItemType[] = [];
        if (product.quantity === selectedProduct.quantity) {
            setCart((prev) => {
                cartData = prev.filter((p) => (p._id !== product._id));
                localStorage.setItem("cart", JSON.stringify(cartData));
                return cartData;
            })
        }
        else{
            setCart((prev) => {
                cartData= prev.map((p) => (p._id === product._id) ? ({...p, quantity:p.quantity-product.quantity}) : (p));
                localStorage.setItem("cart", JSON.stringify(cartData));
                return cartData;
            })
        }
    };

    
    useEffect(() => {
        if (cart.length >= 0) {
            const totalItems = cart.reduce((acc, iter) => acc+iter.quantity, 0);            
            const totalAmout = cart.reduce((acc, iter) => acc+(iter.price*iter.quantity), 0);            
            setTotalCartItems(totalItems);
            setTotalCartValue(totalAmout);
        }
    }, [cart]);
    
    return(
        <CartContext.Provider value={{cart, setCart, totalCartItems, totalCartValue, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
} 
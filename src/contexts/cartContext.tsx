import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";


export type ProductType = {_id:string; name:string; price:number; imgUrl:string;};
export type CartItemType = {_id:string; name:string; price:number; imgUrl:string; quantity:number;};
interface CartContextType{
    cart:CartItemType[];
    setCart:Dispatch<SetStateAction<CartItemType[]>>;
    totalCartItems:number;
    addToCart:(product:CartItemType|null)=>void;
    removeFromCart:(product:CartItemType)=>void;
};

export const CartContext = createContext<CartContextType|null>(null);

export function CartProvider({children}:{children:ReactNode;}){
    const [cart, setCart] = useState<CartItemType[]>(JSON.parse(localStorage.getItem("cart")||"[]") as CartItemType[]);
    const [totalCartItems, setTotalCartItems] = useState<number>(0);

    
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

        if (selectedProduct.quantity === 1) {
            setCart((prev) => prev.filter((p) => (p._id !== product._id)))
        }
        else{
            setCart((prev) => 
                prev.map((p) => (p._id === product._id) ? ({...p, quantity:p.quantity-product.quantity}) : (p))
            )
        }    
    };

    
    useEffect(() => {
        if (cart.length !== 0) {
            const totalItems = cart.reduce((acc, iter) => acc+=iter.quantity, 0);
            setTotalCartItems(totalItems);
        }
    }, [cart]);
    
    return(
        <CartContext.Provider value={{cart, setCart, totalCartItems, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
} 
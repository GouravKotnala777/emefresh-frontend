import { useNavigate } from "react-router-dom";
import type { CartItemType } from "../contexts/cartContext";
import useCart from "../hooks/useCart";
import { useEffect, useState } from "react";
import Spinner from "../components/reusable_components/Spinner.component";
import ImageWithFallback from "../components/reusable_components/ImageWithFallback.component";
let qtyUpdatingTimer = 0;
function Cart() {
    const {cart, addToCart, removeFromCart, totalCartValue} = useCart();
    const [qtyUpdatingProduct, setQtyUpdatingProduct] = useState<string|null>(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    function changeQunatityHandler(product:CartItemType, process:"add"|"remove") {
        clearTimeout(qtyUpdatingTimer);
        setQtyUpdatingProduct(product._id);
        if (process === "add") {
            qtyUpdatingTimer = setTimeout(() => {
                addToCart(product);
                setQtyUpdatingProduct(null);                
            }, 700);
        }
        else if (process === "remove") {
            qtyUpdatingTimer = setTimeout(() => {
                removeFromCart(product);
                setQtyUpdatingProduct(null);
            }, 700);
        }
    }

    useEffect(() => {
        if (cart.length === 0) {
            return;
        }

        setIsLoading(false);
    }, []);

    if (cart.length === 0) {
        return(
            <section className="text-md text-neutral-800">
                <div className="mt-15 w-full">
                    <img src="empty_cart.jpg" alt="empty_cart.jpg"/>
                </div>
            </section>
        )
    }
    
    return(
        <section className="text-md text-neutral-800">
            <div className="mt-15">
                <h1 className="text-neutral-700 font-bold text-lg text-center py-2">Cart</h1>
                <div className="px-2">
                    <button className="bg-green-500/80 flex gap-3 ml-auto items-center px-1.5 py-1 rounded-md cursor-pointer hover:opacity-50"
                        onClick={() => navigate("/checkout", {state:{products:cart.map((iter) => ({productID:iter._id, price:iter.price, quantity:iter.quantity}))}})}
                    >
                        <div className="text-green-700 text-sm font-semibold">checkout all</div>
                        <div className="text-sm bg-white border border-green-500/80 text-green-500/80 px-2 py-1 rounded-md">₹{totalCartValue}</div>
                    </button>
                </div>
                <div className="max-w-3xl relative min-h-500">
                    {
                        cart.map(({_id, name, price, image, quantity}, index) => (
                            <div key={index} className="border-b border-neutral-200 px-2 py-5">
                                <div className="">
                                    <button className="size-6 flex justify-center items-center ml-auto bg-red-300 text-white rounded-md text-xs font-semibold" onClick={() => {removeFromCart({_id, name, image, price, quantity})}}>X</button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className=" h-14">
                                        <ImageWithFallback image={image} />
                                    </div>
                                    <div className="text-xs">
                                        <div className="text-neutral-800">{name}</div>
                                    </div>
                                    <div className="text-xs">
                                        <span className="">{quantity} x</span>
                                    </div>
                                    <div>
                                        <span>₹</span><span className="text-lg font-semibold">{price}</span>
                                    </div>
                                </div>
                                <div className="text-sm flex justify-between mt-5" onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                                    <div className="border border-gray-400 flex justify-between items-center rounded-md overflow-hidden">
                                        <button className="h-full px-4 text-xl active:bg-white/30 transition-colors duration-300 ease-in-out hover:bg-gray-200 cursor-pointer"
                                            onClick={() => changeQunatityHandler({_id, name, price, image, quantity:1}, "remove")}
                                        >-</button>
                                        <div className="text-sm w-12 px-2 text-center">{qtyUpdatingProduct === _id?<Spinner width="20px" thickness="2px" color="gray" />:quantity}</div>
                                        {/*<input className="text-sm w-12 px-2" type="number" name="quantity" placeholder={quantity.toString()} />*/}
                                        <button className="h-full px-4 text-xl active:bg-white/30 transition-colors duration-300 ease-in-out hover:bg-gray-200 cursor-pointer"
                                            onClick={() => changeQunatityHandler({_id, name, price, image, quantity:1}, "add")}
                                        >+</button>
                                    </div>
                                    {/*<button className="px-2 py-2 rounded-md bg-yellow-500 active:opacity-80"
                                        onClick={() => addToCart({_id, name, price, quantity:1, image:image?.[0]||""})}
                                    >Add To Cart</button>*/}
                                    <button className="px-2 py-2 text-white rounded-md bg-green-500 active:opacity-80">Buy</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
};

export default Cart;
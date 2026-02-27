import type { CartItemType } from "../contexts/cartContext";
import useCart from "../hooks/useCart";

function Cart() {
    const {cart, addToCart, removeFromCart} = useCart();

    function changeQunatityHandler(product:CartItemType, process:"add"|"remove") {
        if (process === "add") {
            addToCart(product);
        }
        else if (process === "remove") {
            removeFromCart(product);
        }
    }
    
    return(
        <section className="text-md text-neutral-800">
            <div className="mt-15">
                <pre>{JSON.stringify(cart, null, `\t`)}</pre>
                <div className="max-w-3xl relative">
                    {
                        cart.map(({_id, name, price, image, quantity}, index) => (
                            <div key={index} className="border-b border-neutral-200 px-2 py-5">
                                <div className="">
                                    <button className="size-6 flex justify-center items-center ml-auto bg-red-300 text-white rounded-md text-xs font-semibold" onClick={() => {removeFromCart({_id, name, image, price, quantity})}}>X</button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="w-15 h-15">
                                        <img src="vite.svg" alt="vite.svg" className="w-full h-full" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="text-neutral-800">{name}</div>
                                    </div>
                                    <div>
                                        <span className="text-sm">{quantity} x</span>
                                    </div>
                                    <div>
                                        <span>₹</span><span className="text-lg font-semibold">{price}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-white flex justify-between mt-5" onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                                    <div className="border flex justify-between rounded-md">
                                        <button className="px-4 text-xl active:bg-white/30 transition-colors duration-300 ease-in-out"
                                            onClick={() => changeQunatityHandler({_id, name, price, image, quantity:1}, "remove")}
                                        >-</button>
                                        <input className="text-sm w-10 px-2" type="number" name="quantity" placeholder={quantity.toString()} />
                                        <button className="px-4 text-xl active:bg-white/30 transition-colors duration-300 ease-in-out"
                                            onClick={() => changeQunatityHandler({_id, name, price, image, quantity:1}, "add")}
                                        >+</button>
                                    </div>
                                    {/*<button className="px-2 py-2 rounded-md bg-yellow-500 active:opacity-80"
                                        onClick={() => addToCart({_id, name, price, quantity:1, image:image?.[0]||""})}
                                    >Add To Cart</button>*/}
                                    <button className="px-2 py-2 rounded-md bg-green-500 active:opacity-80">Buy</button>
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
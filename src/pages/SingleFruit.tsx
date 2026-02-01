import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import { fruits } from "./Home.page";
import type { CartItemType } from "../contexts/cartContext";


const tabContent = {
    description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, est. description...",
    productInfo:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, est. productInfo..."
};
function SingleFruit() {
    const {cart, addToCart} = useCart();
    const {productID, fruit_name} = useParams();
    const [selectedProduct, setSelectedProduct] = useState<CartItemType|null>(null);
    const [selectedTab, setSelectedTab] = useState<"description"|"productInfo">("description");

    useEffect(() => {
        const findResult = fruits.find((f) => f._id === productID);
        if (!findResult) throw new Error("findResult not found");
        setSelectedProduct({...findResult, quantity:1});
    }, []);
    
    return(
        <section className="border border-violet-500 text-md text-neutral-800">
            <div className="border-2 mt-15">
                <div className="max-w-3xl relative">
                        <h2 className="border border-green-500 text-center text-lg font-semibold text-neutral-800">{fruit_name?.toUpperCase()}</h2>
                        <div className="border border-red-500">
                            <div className="w-[30%] mx-auto">
                                <img src={`/${fruit_name}.png`} alt={`${fruit_name}.png`} className="w-full" />
                            </div>

                            {/* Description Tab */}
                            <div className="border">
                                <div className="flex text-xs">
                                    <button className={`${selectedTab === "description"?"bg-neutral-300":"bg-neutral-500"} py-2 px-3`} onClick={() => setSelectedTab("description")}>Description</button>
                                    <button className={`${selectedTab === "productInfo"?"bg-neutral-300":"bg-neutral-500"} py-2 px-3`} onClick={() => setSelectedTab("productInfo")}>Product Info</button>
                                </div>
                                <p className="bg-neutral-300 py-2 px-3" >
                                    {
                                        tabContent[selectedTab]
                                    }
                                </p>
                            </div>

                            <pre>{JSON.stringify(cart, null, `\t`)}</pre>
                            
                            <div className="mx-auto mt-7 border-b border-neutral-100">
                                <div className="w-35 mx-auto">
                                    <img src={`/${fruit_name}_juice.png`} alt={`${fruit_name}_juice.png`} className="w-full" />
                                </div>
                                <p className="text-nowrap truncate py-1 text-sm text-center">Lorem ipsum dolor</p>
                                <p className="text-xl font-semibold text-center">₹110/-</p>
                                <div className="flex justify-between my-2">
                                    <button className="py-2 px-3 text-sm rounded-sm bg-transparent border border-neutral-800"
                                        onClick={() => addToCart(selectedProduct)}
                                    >Add to Cart</button>
                                    <button className="py-2 px-3 text-sm rounded-sm bg-green-500 text-white">Buy</button>
                                </div>
                            </div>

                            <div className="mx-auto mt-7 border-b border-neutral-100">
                                <div className="w-35 mx-auto">
                                    <img src={`/${fruit_name}_frozen.png`} alt={`${fruit_name}_frozen.png`} className="w-full" />
                                </div>
                                <p className="text-nowrap truncate py-1 text-sm text-center">Lorem ipsum dolor</p>
                                <p className="text-xl font-semibold text-center">₹110/-</p>
                                <div className="flex justify-between my-2">
                                    <button className="py-2 px-3 text-sm rounded-sm bg-neutral-100 text-neutral-800 border border-neutral-800">Add to Cart</button>
                                    <button className="py-2 px-3 text-sm rounded-sm bg-green-500 text-white">Buy</button>
                                </div>
                            </div>

                        </div>
                </div>
            </div>
        </section>
    )
};

export default SingleFruit;
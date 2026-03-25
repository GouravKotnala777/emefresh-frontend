import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import { fruits } from "./Home.page";
import type { CartItemType } from "../contexts/cartContext";
import { getProductsWithTag, type ProductTypes } from "../apis/productApi";


const tabContent = {
    description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, est. description...",
    productInfo:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, est. productInfo..."
};
function SingleFruit() {
    const {cart, addToCart} = useCart();
    const {productID, fruit_name} = useParams();
    const [selectedFruit, setSelectedFruit] = useState<CartItemType|null>(null);
    const [productsWithSameFruit, setProductsWithSameFruit] = useState<ProductTypes[]>([]);
    const [selectedTab, setSelectedTab] = useState<"description"|"productInfo">("description");


    async function getProductsWithTagHandler() {
        if (!fruit_name) throw Error("fruit_name is undefined");

        const res = await getProductsWithTag({tagName:fruit_name});

        if (res.success && res.jsonData && res.jsonData?.length !== 0) {
            setProductsWithSameFruit(res.jsonData);
        }
    };

    useEffect(() => {
        const findResult = fruits.find((f) => f._id === productID);
        if (!findResult) throw new Error("findResult not found");
        setSelectedFruit({...findResult, quantity:1});
        getProductsWithTagHandler();
    }, []);


    
    return(
        <section className="text-md text-neutral-800">
            <div className="mt-15">
                <div className="max-w-3xl relative">
                        <h2 className="text-center text-lg font-semibold text-neutral-800">{fruit_name?.toUpperCase()}</h2>
                        <div className="">
                            <div className="w-[30%] mx-auto my-3">
                                <img src={`/${fruit_name}.png`} alt={`${fruit_name}.png`} className="w-full" />
                            </div>

                            {/* Description Tab */}
                            <div className="">
                                <div className="flex text-xs">
                                    <button className={`border border-t-gray-200 border-x-gray-200 ${selectedTab === "description"?"border-b-white":"border-b-gray-200 bg-gray-100"} py-2 px-3`} onClick={() => setSelectedTab("description")}>Description</button>
                                    <button className={`border border-t-gray-200 border-x-gray-200 ${selectedTab === "productInfo"?"border-b-white":"border-b-gray-200 bg-gray-100"} py-2 px-3`} onClick={() => setSelectedTab("productInfo")}>Product Info</button>
                                </div>
                                <p className="p-3 text-sm tracking-wide">
                                    {
                                        tabContent[selectedTab]
                                    }
                                </p>
                            </div>

                            
                            {
                                productsWithSameFruit.map((product) => (
                                    <div className="mx-auto mt-7 border-b border-neutral-100">
                                        <div className="w-35 mx-auto">
                                            <img src={`${import.meta.env.VITE_SERVER_URL}/api/v1${product?.image}`} alt={`${import.meta.env.VITE_SERVER_URL}/api/v1/${product?.image}`} className="w-full text-[6px]" />
                                        </div>
                                        <p className="text-nowrap truncate py-1 text-sm text-center">Lorem ipsum dolor</p>
                                        <p className="text-xl font-semibold text-center">₹110/-</p>
                                        <div className="flex justify-between my-2">
                                            <button className="py-2 px-3 text-sm rounded-sm bg-transparent border border-neutral-800"
                                                onClick={() => addToCart(selectedFruit)}
                                            >Add to Cart</button>
                                            <button className="py-2 px-3 text-sm rounded-sm bg-green-500 text-white">Buy</button>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                </div>
            </div>
        </section>
    )
};

export default SingleFruit;
import { useEffect, useState } from "react";
import { getSingleProduct, type ProductTypes } from "../apis/productApi";
import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";

const tabContent = {
    description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, est. description...",
    productInfo:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, est. productInfo..."
};

function SingleProduct() {
    const {addToCart} = useCart();
    const {productID} = useParams();
    const [singleProduct, setSingleProduct] = useState<ProductTypes>({_id:"", name:"", price:0, category:"null", image:"", weight:"", volume:"", rating:0, avgRating:0, numReviews:0, soldCount:0, returnCount:0, tag:[]});
    const [selectedTab, setSelectedTab] = useState<"description"|"productInfo">("description");


    async function getSingleProductHandler() {
        const res = await getSingleProduct({productID});
        if (res.success && res.jsonData) {
            setSingleProduct(res.jsonData);
        }
        else{
            throw Error("SingleProduct > getSingleProductHandler > getSingleProduct")
        }
    };

    useEffect(() => {
        getSingleProductHandler();
    }, []);
    
    return(
        <section className="border border-violet-500 text-md text-neutral-800">
            <div className="border-2 mt-15">
                <div className="max-w-3xl relative">
                        <h2 className="border border-green-500 text-center text-lg font-semibold text-neutral-800">{singleProduct?.name?.toUpperCase()}</h2>
                        <div className="border border-red-500">
                            <div className="w-[30%] mx-auto">
                                <img src={`${import.meta.env.VITE_SERVER_URL}/api/v1${singleProduct?.image}`} alt={`${import.meta.env.VITE_SERVER_URL}/api/v1${singleProduct?.image}`} className="text-[6px] w-full" />
                            </div>

                            <div className="text-sm text-white flex justify-between" onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                                <button className="px-2 py-2 rounded-md bg-yellow-500 active:opacity-80"
                                    onClick={() => addToCart({_id:singleProduct._id, name:singleProduct.name, price:singleProduct.price, quantity:1, image:singleProduct?.image||""})}
                                >Add To Cart</button>
                                <button className="px-2 py-2 rounded-md bg-green-500 active:opacity-80">Buy</button>
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

                        </div>
                </div>
            </div>
        </section>
    )
};

export default SingleProduct;
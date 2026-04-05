import { useEffect, useState } from "react";
import { getSingleProduct, type ProductTypes } from "../apis/productApi";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import Spinner from "../components/reusable_components/Spinner.component";

const tabContent = {
    description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, est. description...",
    productInfo:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, est. productInfo..."
};
const userRole:"user"|"admin" = "admin";

function SingleProduct() {
    const {addToCart} = useCart();
    const {productID} = useParams();
    const navigate = useNavigate();
    const [singleProduct, setSingleProduct] = useState<ProductTypes>({_id:"", name:"", price:0, category:"null", image:"", weight:"", volume:"", rating:0, avgRating:0, numReviews:0, soldCount:0, returnCount:0, tag:[]});
    const [selectedTab, setSelectedTab] = useState<"description"|"productInfo">("description");
    const [processingProduct, setProcessingProduct] = useState<string|null>(null);


    async function getSingleProductHandler() {
        const res = await getSingleProduct({productID});
        if (res.success && res.jsonData) {
            setSingleProduct(res.jsonData);
        }
        else{
            throw Error("SingleProduct > getSingleProductHandler > getSingleProduct")
        }
    };

    async function addToCartHandler({_id, name, price, image}:Pick<ProductTypes, "_id"|"name"|"price"|"image">) {
        setProcessingProduct(_id);
        await addToCart({_id, name, price, quantity:1, image:image||""});
        setProcessingProduct(null);
    };

    useEffect(() => {
        getSingleProductHandler();
    }, []);
    
    return(
        <section className="text-md text-neutral-800">
            <div className="mt-15">
                <div className="max-w-3xl relative">
                        <h2 className="text-center text-lg font-semibold text-neutral-800">{singleProduct?.name?.toUpperCase()}</h2>
                        <div className="">
                            <div className="w-[30%] mx-auto">
                                <img src={`${import.meta.env.VITE_SERVER_URL}/api/v1${singleProduct?.image}`} alt={`${import.meta.env.VITE_SERVER_URL}/api/v1${singleProduct?.image}`} className="text-[6px] w-full" />
                            </div>

                            {/* Preview images and Update button */}
                            <div className="my-5">
                                <div className="flex justify-around">
                                    {
                                        singleProduct?.previewImages?.map((img, index) => (
                                            <img key={index} src={`${import.meta.env.VITE_SERVER_URL}/api/v1${img}`} alt={`${import.meta.env.VITE_SERVER_URL}/api/v1${img}`} className="w-10 h-10" />
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="text-center my-1">
                                <div><span className="text-sm">₹</span><span className="text-xl font-semibold text-neutral-700">{singleProduct.price}</span></div>
                            </div>

                            <div className="text-sm text-white flex justify-between" onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                                {/* Add To Cart Button */}
                                <button className="min-w-23 px-2 py-2 rounded-md bg-yellow-500"
                                    onClick={() => addToCartHandler({_id:singleProduct._id, name:singleProduct.name, price:singleProduct.price, image:singleProduct?.image||""})}
                                >{processingProduct === singleProduct._id?<Spinner width="20px" thickness="2px" color="white" />:"Add To Cart"}</button>


                                {/* Buy Button & Update Product Page Button*/}
                                {
                                    userRole === "user" ?
                                    <button className="px-2 py-2 rounded-md bg-green-500 active:opacity-80"
                                        onClick={() => navigate("/checkout", {state:{products:[{productID:singleProduct._id, price:singleProduct.price, quantity:1}]}})}
                                    >Buy</button>
                                    :
                                    <button className="px-2 py-2 rounded-md bg-blue-500 active:opacity-80"
                                        onClick={() => navigate(`/update_product`, {state:{singleProduct}})}
                                    >Update</button>
                                }
                                

                            </div>

                            {/* Description Tab */}
                            <div className="">
                                <div className="flex text-xs">
                                    <button className={`${selectedTab === "description"?"bg-neutral-300":"bg-neutral-500"} py-2 px-3`} onClick={() => setSelectedTab("description")}>Description</button>
                                    <button className={`${selectedTab === "productInfo"?"bg-neutral-300":"bg-neutral-500"} py-2 px-3`} onClick={() => setSelectedTab("productInfo")}>Product Info</button>
                                </div>
                                <p className="bg-neutral-300 py-2 px-3" >
                                    {
                                        selectedTab === "description"?singleProduct.description:tabContent[selectedTab]
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
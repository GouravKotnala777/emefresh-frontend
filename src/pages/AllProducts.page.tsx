import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { allProducts, type ProductTypes } from "../apis/productApi";
import useCart from "../hooks/useCart";

function AllProducts() {
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const {addToCart} = useCart();

    async function getAllProductsHandler() {
        const productsRes = await allProducts();

        if (productsRes.success && productsRes.jsonData) {
            setProducts(productsRes.jsonData);
        }
    };

    useEffect(() => {
        getAllProductsHandler();
    }, []);
    
    return(
        <section className="text-md text-neutral-800">
            <div className="mt-15">
                <div className="max-w-3xl relative">
                    <div className="flex flex-wrap justify-center gap-5 min-h-500">
                        {
                            products.map(({_id, name, price, description, image}) => (
                                <NavLink to={`/single_product/${_id}`} className="bg-white w-50 flex flex-col justify-between gap-2 p-2 rounded-xl">
                                    <div data-productID={_id} className="">
                                        <img src={`${import.meta.env.VITE_SERVER_URL}/api/v1${image}`} alt={`${import.meta.env.VITE_SERVER_URL}/api/v1${image}`} className="w-full" />
                                    </div>
                                    <div className="text-center flex-1">
                                        <div className="text-md text-neutral-800 font-semibold">{name}</div>
                                        <div className="text-lg text-neutral-800 font-bold"><span className="text-sm font-light">₹</span>{price}<span className="text-sm font-light">/-</span></div>
                                        <div className="text-sm text-neutral-600 text-left py-1">{description}</div>
                                    </div>
                                    <div className="text-sm text-white flex justify-between" onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                                        <button className="px-2 py-2 rounded-md bg-yellow-500 active:opacity-80"
                                            onClick={() => addToCart({_id, name, price, quantity:1, image:image?.[0]||""})}
                                        >Add To Cart</button>
                                        <button className="px-2 py-2 rounded-md bg-green-500 active:opacity-80">Buy</button>
                                    </div>
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            </div>

        </section>
    )
};

export default AllProducts;
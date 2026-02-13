import { useEffect, useState } from "react";
import Slider from "../components/reusable_components/Slider.component";
import { NavLink } from "react-router-dom";
import type { ProductType } from "../contexts/cartContext";
import { allProducts, type ProductTypes } from "../apis/productApi";
import useCart from "../hooks/useCart";

//const banners = ["banner2.jpg","banner3.jpg","banner4.jpg","banner6.jpg","banner7.jpg","banner8.jpg","banner2.jpg"]
const banners = ["b1.jpeg","b2.jpeg","b3.jpeg","b4.jpeg","b5.jpeg","b6.jpeg","b7.jpeg"];
export const fruits:ProductType[] = [
    {_id:"0001", name:"apple", imgUrl:"apple.png", price:100},
    {_id:"0002", name:"mango", imgUrl:"mango.png", price:100},
    {_id:"0003", name:"orange", imgUrl:"orange.png", price:100},
    {_id:"0004", name:"banana", imgUrl:"banana.png", price:100},
    {_id:"0005", name:"guava", imgUrl:"guava.png", price:100},
    {_id:"0006", name:"pear", imgUrl:"pear.png", price:100},
    {_id:"0007", name:"peach", imgUrl:"peach.png", price:100},
    {_id:"0008", name:"strawberry", imgUrl:"strawberry.png", price:100},
    {_id:"0009", name:"blueberry", imgUrl:"blueberry.png", price:100},
    {_id:"0010", name:"pineapple", imgUrl:"pineapple.png", price:100},
    {_id:"0011", name:"blackberry", imgUrl:"blackberry.png", price:100},
];
const categories = ["p1.png","p1.png","p1.png","p1.png","p1.png","p1.png","p1.png","p1.png",];

function Home() {
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const {addToCart} = useCart();

    async function getAllProductsHandler() {
        const productsRes = await allProducts();

        if (productsRes.success && productsRes.jsonData) {
            setProducts(productsRes.jsonData);
        }
    }


    useEffect(() => {
        getAllProductsHandler();
    }, []);
    
    return(
        <section className="border border-violet-500 text-md text-neutral-800">
            
            



            <div className="border-2 mt-15">
                <div className="flex max-w-3xl relative">
                    <Slider btns={{size:'30'}}>
                        {
                            banners.map((b) => (
                                <img className="w-full h-full" src={b} alt={b} />
                            ))
                        }
                    </Slider>
                </div>
            </div>


            
            <div className="border-2 mt-15">
                <div className="max-w-3xl relative">
                    <div className="flex flex-wrap justify-center gap-5">
                        {
                            products.map(({_id, name, price, description, images}) => (
                                <div className="bg-white border w-50 flex flex-col justify-between gap-2 p-2 rounded-xl">
                                    <div className="">
                                        <img src="vite.svg" alt="vite.svg" className="w-full" />
                                    </div>
                                    <div className="text-center flex-1">
                                        <div className="text-md text-neutral-800 font-semibold">{name}</div>
                                        <div className="text-lg text-neutral-800 font-bold"><span className="text-sm font-light">₹</span>{price}<span className="text-sm font-light">/-</span></div>
                                        <div className="text-sm text-neutral-600 text-left my-1">{description}</div>
                                    </div>
                                    <div className="text-sm text-white flex justify-between">
                                        <button className="border px-2 py-2 rounded-md bg-yellow-500 active:opacity-80"
                                            onClick={() => addToCart({_id, name, price, quantity:1, imgUrl:images?.[0]||""})}
                                        >Add To Cart</button>
                                        <button className="border px-2 py-2 rounded-md bg-green-500 active:opacity-80">Buy</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


            


            <div className="border-2 mt-15">
                <div className="max-w-3xl relative">
                        <h2 className="border border-green-500 text-center text-lg font-semibold text-neutral-800">Fruits</h2>
                        <div className="border border-red-500 flex justify-between flex-wrap">
                                {
                                    fruits.map(({_id, name, imgUrl}) => (
                                        <NavLink to={`/single_fruit/${name}/${_id}`} className="h-25 w-20 p-2 m-2 rounded-lg bg-white [box-shadow:0px_0px_4px_0.2px_var(--color-neutral-700)]">
                                            <img src={imgUrl} alt={imgUrl} className="w-full h-[80%]" />
                                            <p className="text-xs text-center">{name}</p>
                                        </NavLink>
                                    ))
                                }
                        </div>
                </div>
            </div>

            <div className="border-2 mt-15">
                <div className="max-w-3xl relative">
                        <h2 className="border border-green-500 text-center text-lg font-semibold text-neutral-800">Categories</h2>
                        <div className="border border-red-500 flex justify-between flex-wrap">
                                {
                                    categories.map((c) => (
                                        <div className="h-25 w-20 p-2 m-2 rounded-lg bg-white [box-shadow:0px_0px_4px_0.2px_var(--color-neutral-700)]">
                                            <img src={c} alt={c} className="w-full h-[80%]" />
                                            <p className="text-xs text-center">gourav</p>
                                        </div>
                                    ))
                                }
                        </div>
                </div>
            </div>

        </section>
    )
};

export default Home;
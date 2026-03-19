import { useEffect, useState } from "react";
import { getMyOrders, type OrderTypes } from "../apis/orderApi";


function MyOrders() {
    const [myOrders, setMyOrders] = useState<OrderTypes[]>([]);

    async function getMyOrdersHandler() {
        const res = await getMyOrders();
        if (res.success && res.jsonData) {
            setMyOrders(res.jsonData);
        }
        console.log(res);
    }

    useEffect(() => {
        getMyOrdersHandler();
    }, []);
    
    return(
        <section className="text-md text-neutral-800">
            <div className="mt-15">
                <h1 className="font-bold text-lg text-center py-2">My Orders</h1>
                <div className="flex flex-col gap-3 mt-3 text-sm">
                    {
                        myOrders.map(({_id, products, orderStatus, createdAt}) => (
                            <div key={_id} className="border-t border-gray-200 relative pt-2 pb-3">

                                <div className="bg-white px-1 text-xs text-gray-400 flex justify-center items-center gap-2 absolute -top-2 left-[50%] -translate-x-[50%]">
                                    <div>{createdAt.split("T")[0].split("-").reverse().join("-")}</div>
                                    <div className={`font-semibold
                                        ${orderStatus === "pending" && "text-yellow-400"}
                                        ${orderStatus === "cancelled" && "text-red-500"}
                                        ${orderStatus === "delivered" && "text-blue-400"}
                                        ${orderStatus === "returned" && "text-gray-300"}
                                        `}>( {orderStatus} )</div>
                                </div>
                                <div className="px-2 py-3 flex flex-col items-center gap-4">
                                    {
                                        products.map(({productID, price, quantity}) => (
                                            <div key={`${_id}-${productID}`} className="flex gap-4">
                                                <img src={"vite.svg"} alt={"vite.svg"} />
                                                <div>{productID.slice(18)}</div>
                                                <div>₹{price}</div>
                                                <div>x {quantity}</div>
                                            </div>
                                        ))
                                    }                                
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
};

export default MyOrders;
import { useLocation } from "react-router-dom"
import { createOrder, type LocationTypes } from "../apis/orderApi";
import { useEffect, useState, type ChangeEvent } from "react";


function Checkout() {
    const {state:{products}}:{state:{products:{productID:string; price:number; quantity:number;}[]}} = useLocation();
    const [addressTab, setAddressTab] = useState<"addressForm"|"allowLocation">("addressForm");
    const [modeOfPayment, setModeOfPayment] = useState<"cod"|"card">("card");
    const [location, setLocation] = useState<LocationTypes>({long:0, lat:0, address:"", timestamp:0});
    const [totalAmount, setTotalAmout] = useState<number>(0);
    const [address, setAddress] = useState<{area1:string; area2:string; city:string; state:string; country:string; pincode:string}>({area1:"", area2:"", city:"", state:"", country:"", pincode:""});


    function onAddressFormChangeHandler(e:ChangeEvent<HTMLInputElement>) {
        setAddress({...address, [e.target.name]:e.target.value});
    };

    function getLocationAccess() {
        navigator.geolocation.getCurrentPosition(
            ({coords, timestamp}) => {
                const res = {
                    long:coords.longitude,
                    lat:coords.latitude,
                    address:"",
                    timestamp
                };
                console.log(res);
                setLocation(res);
            },
            (error) => {
                console.log(error);
                console.log("Checkout.page > getLocationAccess");
            }
        );
    };

    async function createOrderHandler() {
        const res = await createOrder({products, totalAmount, location:{...location, address:Object.values(address).join(" ")}, modeOfPayment, paymentStatus:"pending", orderStatus:"pending"});
        
        console.log(res);
    };

    useEffect(() => {
        const totalOrderedProductsPrice = products.reduce((acc, iter) => acc+=(iter.price*iter.quantity), 0);
        setTotalAmout(totalOrderedProductsPrice);
    }, []);
    

    return(
        <section className="text-md text-neutral-800">
            <div className="mt-15">

                {/* Address Form Or Location Ratio Inputs */}
                <form className="max-w-full w-sm bg-white p-3 border-b border-gray-200">
                    <legend className="text-neutral-700 font-bold text-lg text-center py-2">Fill Adrress or Use Location</legend>
                    <fieldset className="flex justify-around items-center text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <input type="radio" id="addressForm" name="addressTab" value="addressForm" onChange={() => setAddressTab("addressForm")} />
                            <label htmlFor="addressForm">Address Form</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="allowLocation" name="addressTab" value="allowLocation" onChange={() => setAddressTab("allowLocation")} />
                            <label htmlFor="allowLocation">Allow Location</label>
                        </div>
                    </fieldset>
                </form>

                {
                    addressTab === "addressForm" ?
                        //Address Form
                        <div className="max-w-full w-sm bg-white p-3 border-b border-gray-200">
                            <h1 className="text-neutral-700 font-bold text-lg text-center py-2">Address Form</h1>
                            <form className="flex flex-col gap-3 mt-3 text-sm">
                                <input type="text" name="area1" placeholder="Area-1" className="p-2" onChange={onAddressFormChangeHandler} />
                                <input type="text" name="area2" placeholder="Area-2" className="p-2" onChange={onAddressFormChangeHandler} />
                                <input type="text" name="city" placeholder="City" className="p-2" onChange={onAddressFormChangeHandler} />
                                <input type="text" name="state" placeholder="State" className="p-2" onChange={onAddressFormChangeHandler} />
                                <input type="text" name="country" placeholder="Country" className="p-2" onChange={onAddressFormChangeHandler} />
                                <input type="text" name="pincode" placeholder="Pin Code" className="p-2" onChange={onAddressFormChangeHandler} />
                                {/*<button className="border border-sky-500 py-2 font-semibold text-sky-500 bg-sky-50 rounded-md [box-shadow:0px_0px_4px_0.2px_var(sky-500)] hover:opacity-80 transition-all ease-in-out duration-300" onClick={onClickHandler}>Set Order Address</button>*/}
                            </form>
                        </div>
                        :
                        // Get Location Access Button
                        <div className="flex flex-col gap-3 mt-3 text-sm p-3">
                            <button className="border border-sky-500 py-2 font-semibold text-sky-500 bg-sky-50 rounded-md [box-shadow:0px_0px_4px_0.2px_var(sky-500)] hover:opacity-80 transition-all ease-in-out duration-300"
                                onClick={getLocationAccess}
                            >Get Location Access</button>
                        </div>

                }

                

                {/* Mode of Payment Radio Inputs */}
                <form className="max-w-full w-sm bg-white p-3 border-b border-gray-200">
                    <legend className="text-neutral-700 font-bold text-lg text-center py-2">Select Mode Of Payment</legend>
                    <fieldset className="flex justify-around items-center text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <input type="radio" id="cod" name="modeOfPayment" value="cod" onChange={() => setModeOfPayment("cod")} />
                            <label htmlFor="cod">cash on delivery</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="card" name="modeOfPayment" value="card" onChange={() => setModeOfPayment("card")} />
                            <label htmlFor="card">card</label>
                        </div>
                    </fieldset>
                </form>


                {
                    modeOfPayment === "card" ?
                        //Card Form
                        <div className="max-w-full w-sm bg-white p-3 border-b border-gray-200">
                            <h1 className="text-neutral-700 font-bold text-lg text-center py-2">Checkout Form</h1>
                            <form className="flex flex-col gap-3 mt-3 text-sm">
                                <input type="text" name="name" placeholder="Card Number" className="p-2" />
                                <input type="text" name="email" placeholder="Amount" className="p-2" />
                                <button className="border border-sky-500 py-2 font-semibold text-sky-500 bg-sky-50 rounded-md [box-shadow:0px_0px_4px_0.2px_var(sky-500)] hover:opacity-80 transition-all ease-in-out duration-300">Set Order Address</button>
                            </form>
                        </div>
                        :
                        // Cash On Delivery Place Order Button
                        <div className="flex flex-col gap-3 mt-3 text-sm p-3">
                            <button className="border border-sky-500 py-2 font-semibold text-sky-500 bg-sky-50 rounded-md [box-shadow:0px_0px_4px_0.2px_var(sky-500)] hover:opacity-80 transition-all ease-in-out duration-300"
                                onClick={createOrderHandler}
                            >Place Order</button>
                        </div>

                }



            </div>
        </section>
    )
};

export default Checkout;
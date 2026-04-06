import { useState, type ChangeEvent, type MouseEvent } from "react";
import { createProduct, type CreateProductBodyTypes } from "../apis/productApi";


function CreateProduct() {
    const [createProductFormData, setCreateProductFormData] = useState<CreateProductBodyTypes>({name:"", price:0, description:"", category:"null", weight:"", volume:"", tag:"", servings:"", experience:"", principle:"", vitamins:"", minerals:""});

    function onChangeHandler(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
        //const fieldName = e.target.name as keyof CreateProductBodyTypes;
        setCreateProductFormData({...createProductFormData, [e.target.name]:e.target.value});

        // should i transform tag field's value (items saperated by comma) from string to array in frontend or should i send string items (saperated by comma) to server and then transform it there
        //if (fieldName === "tag") {
        //    const tagArray = e.target.value.split(",");
        //    setCreateProductFormType({...createProductFormType, tag:tagArray});
            
        //}else{
        //    setCreateProductFormType({...createProductFormType, [e.target.name]:e.target.value});
        //}
    };

    async function createProductHandler(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const res = await createProduct(createProductFormData);
        
        console.log("///////////////////");
        console.log(res);
        console.log("///////////////////");
    };
    
    return(
        <section className="">
            <div className="max-w-full w-sm bg-white mx-auto mt-12 p-3 rounded-lg">
                <h1 className="text-neutral-700 font-bold text-lg text-center py-2">Create New Product</h1>
                <form className="flex flex-col gap-3 mt-3 text-sm">
                    <input type="text" name="name" placeholder="Product Name" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <input type="text" name="price" placeholder="Price" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <input type="text" name="description" placeholder="Description" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <select name="category" className={`p-2 ${createProductFormData.category === "null"?"text-neutral-400":"text-neutral-800"}`} onChange={onChangeHandler}>
                        <option defaultChecked value="null">--select category--</option>
                        <option value="fresh">Fresh</option>
                        <option value="juice">Juice</option>
                        <option value="frozen">Frozen</option>
                        <option value="smoothie">Smoothie</option>
                    </select>
                    <input type="text" name="weight" placeholder="Weight (in gm)" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <input type="text" name="volume" placeholder="Volume (in ml)" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <input type="text" name="tag" placeholder="Add Tags saperated by comma ( , )" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <input type="text" name="warning" placeholder="Add Warnings saperated by comma ( , )" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <input type="text" name="servings" placeholder="Add servings in one pack" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <input type="text" name="experience" placeholder="Add taste , texture , smell , juicyness" className="p-2 text-neutral-800" onChange={onChangeHandler} />
                    <div className="flex">
                        <span className="w-4 text-center content-center bg-sky-300 rounded-l-sm relative group cursor-default">
                            <span className="text-white group-hover:text-sky-500 transition-colors ease-in-out duration-300">*</span>
                            <span className="text-sky-700 text-xs absolute bottom-full font-mono p-2 bg-sky-100 rounded-sm w-65 scale-0 opacity-0 blur-sm group-hover:blur-none group-hover:scale-100 group-hover:opacity-100 transition-all ease-in-out duration-300 delay-300">
                                saperate two units by (,) and amount per product and daily value by (#)
                                eg. calories#104kcal#5%,total fat#0.34g#0%,...
                            </span>
                        </span>
                        <input type="text" name="principle" placeholder="Add principle nutrients" className="p-2 text-neutral-800 flex-1" onChange={onChangeHandler} />
                    </div>
                    <div className="flex">
                        <span className="w-4 text-center content-center bg-sky-300 rounded-l-sm relative group cursor-default">
                            <span className="text-white group-hover:text-sky-500 transition-colors ease-in-out duration-300">*</span>
                            <span className="text-sky-700 text-xs absolute bottom-full font-mono p-2 bg-sky-100 rounded-sm w-65 scale-0 opacity-0 blur-sm group-hover:blur-none group-hover:scale-100 group-hover:opacity-100 transition-all ease-in-out duration-300 delay-300">
                                saperate two units by (,) and amount per product and daily value by (#)
                                eg. [vitamin A#108IU#2%,vitamin C#9.2mg#10%,...]
                            </span>
                        </span>
                        <input type="text" name="vitamins" placeholder="Add vitamin nutrients" className="p-2 text-neutral-800 flex-1" onChange={onChangeHandler} />
                    </div>
                    <div className="flex">
                        <span className="w-4 text-center content-center bg-sky-300 rounded-l-sm relative group cursor-default">
                            <span className="text-white group-hover:text-sky-500 transition-colors ease-in-out duration-300">*</span>
                            <span className="text-sky-700 text-xs absolute bottom-full font-mono p-2 bg-sky-100 rounded-sm w-65 scale-0 opacity-0 blur-sm group-hover:blur-none group-hover:scale-100 group-hover:opacity-100 transition-all ease-in-out duration-300 delay-300">
                                saperate two units by (,) and amount per product and daily value by (#)
                                eg. [potassium#214mg#5%, manganese#0.07mg#3%,...]
                            </span>
                        </span>
                        <input type="text" name="minerals" placeholder="Add mineral nutrients" className="p-2 text-neutral-800 flex-1" onChange={onChangeHandler} />
                    </div>
                    <button className="bg-sky-500 py-2 font-semibold text-white rounded-md [box-shadow:0px_0px_4px_0.2px_gray] hover:opacity-80 transition-all ease-in-out duration-300" onClick={createProductHandler}>Add New Product</button>
                </form>
            </div>
        </section>
    )
};

export default CreateProduct;
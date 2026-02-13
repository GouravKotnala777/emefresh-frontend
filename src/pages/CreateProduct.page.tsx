import { useState, type ChangeEvent, type MouseEvent } from "react";
import { createProduct, type CreateProductBodyTypes } from "../apis/productApi";


function CreateProduct() {
    const [createProductFormData, setCreateProductFormData] = useState<CreateProductBodyTypes>({name:"", price:0, description:"", category:"null", weight:"", volume:"", tag:[]});

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
        <section className="h-screen flex justify-center items-center">
            <div className="max-w-full w-sm bg-white mx-3 p-3 rounded-lg">
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
                    <button className="bg-sky-500 py-2 font-semibold text-white rounded-md [box-shadow:0px_0px_4px_0.2px_gray] hover:opacity-80 transition-all ease-in-out duration-300" onClick={createProductHandler}>Login</button>
                </form>
            </div>
        </section>
    )
};

export default CreateProduct;
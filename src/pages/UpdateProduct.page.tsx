import { useLocation } from "react-router-dom";
import { updateProduct, uploadProductImage, uploadProductPreviewImages, type ProductTypes, type UpdateProductBodyTypes } from "../apis/productApi";
import { useEffect, useState, type ChangeEvent } from "react";


function UpdateProduct() {
    const {state} = useLocation() as {state:{singleProduct:ProductTypes}};
    const [updateForm, setUpdateForm] = useState<UpdateProductBodyTypes>({});
    const [singleProduct, setSingleProduct] = useState<ProductTypes|null>(null);


    function onChangeHandler(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
        const key = e.target.name;
        const value = e.target.value;
        if (value === "") {
            throw Error(`enter a valid category type ${value}`)
        }
        setUpdateForm({...updateForm, [key]:value});
    };

    async function onClickHandler() {
        const productID = singleProduct?._id;
        if (!productID) throw Error("singleProduct is undefined");
        const updateProductRes = await updateProduct({productID, updateForm});
        console.log(updateProductRes);
        if (updateProductRes.success) {
            console.log("product has updated successfully");
        }
        else{
            console.log("error occured");
        }
    };


    async function imagesHandler(e:ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        const productID = singleProduct?._id;
        const MAX_FILE_SIZE = 2*1024*1024; // 2MB
        const MAX_FILES = 3;


        if (!productID) throw Error("singleProduct is undefined");



        if (!fileList || fileList.length === 0) throw Error("fileList is empty");
        if (fileList.length > MAX_FILES) throw Error(`You can only upload ${MAX_FILES} files`);

        for (const file of fileList) {
            if (file.size > MAX_FILE_SIZE) {
                throw Error(`File is too large ---> {name:${file.name}, size:${file.size}}`);
            }
        }


        const formData = new FormData();

        Array.from(fileList).forEach((file) => {
            formData.append("images", file);
        });
        formData.append("productID", productID);

        const res = await uploadProductPreviewImages(formData);

        if (res.success) {
            setSingleProduct({...singleProduct, previewImages:res.jsonData?.previewImagesPath});
        }
        else{
            throw Error("error occured in UpdatedProduct.page.tsx > imageHandler > uploadProductImage > res.success === false");
        }

        console.log(res);


    };
    async function imageHandler(e:ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        const productID = singleProduct?._id;
        const MAX_FILE_SIZE = 2*1024*1024; // 2MB
        
        if (!productID) throw Error("singleProduct is undefined");

        if (!file) throw Error("fileList is empty");

        if (file.size > MAX_FILE_SIZE) throw Error(`File is too large ---> {name:${file.name}, size:${file.size}}`);
        
        const formData = new FormData();
        formData.append("image", file);
        formData.append("productID", productID);

        const res = await uploadProductImage(formData);

        if (res.success) {
            setSingleProduct({...singleProduct, image:res.jsonData?.imagePath});
        }
        else{
            throw Error("error occured in UpdatedProduct.page.tsx > imageHandler > uploadProductImage > res.success === false");
        }
        
        console.log(res);

    };

    useEffect(() => {
        setSingleProduct({...state.singleProduct});
    }, []);

    return(
        <section className="text-md text-neutral-800">
            <div className="mt-15">
                <div className="max-w-3xl relative">
                    <h2 className="text-center text-lg font-semibold text-neutral-800">{singleProduct?.name?.toUpperCase()}</h2>

                    {/* Image and Update button */}
                    <div className="my-5">
                        <div className="w-[30%] mx-auto">
                            <div className="relative">
                                <img src={`${import.meta.env.VITE_SERVER_URL}/api/v1${singleProduct?.image}`} alt={`${import.meta.env.VITE_SERVER_URL}/api/v1${singleProduct?.image}`} className="text-[6px] w-full" />
                                <div className="bg-blue-100/70 absolute w-8 h-8 -right-1 -bottom-1 rounded-full flex justify-center items-center overflow-hidden hover:bg-blue-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                    </svg>
                                    <input type="file" name="image" accept="image/*" placeholder="upload image" className="opacity-0 absolute cursor-pointer" onChange={imageHandler} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview images and Update button */}
                    <div className="my-5">
                        <div className="flex justify-around">
                            {
                                singleProduct?.previewImages?.map((img, index) => (
                                    <img key={index} src={`${import.meta.env.VITE_SERVER_URL}/api/v1${img}`} alt={`${import.meta.env.VITE_SERVER_URL}/api/v1${img}`} className="w-10 h-10" />
                                ))
                            }
                            <div className="relative rounded-full flex justify-center items-center overflow-hidden bg-blue-100/70 hover:bg-blue-200 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                </svg>
                                <input type="file" name="images" accept="image/*" multiple={true} placeholder="upload preview images" className="opacity-0 absolute cursor-pointer" onChange={imagesHandler} />
                            </div>
                        </div>
                    </div>

                    {/* Products update inputs */}
                    <div className="text-center my-1">
                        <input type="text" name="name" placeholder={singleProduct?.name} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <input type="text" name="price" placeholder={"₹"+singleProduct?.price.toString()} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <select name="category" className="border border-gray-200 px-3 py-2 text-gray-400 w-full"
                            value={singleProduct?.category}
                            onChange={onChangeHandler}
                        >
                            <option  value="" disabled={true}>--select category-- </option>
                            <option value="fresh">fresh</option>
                            <option value="frozen">frozen</option>
                            <option value="juice">juice</option>
                            <option value="smoothie">smoothie</option>
                        </select>
                        <input type="text" name="description" placeholder={singleProduct?.description} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <input type="text" name="flavor" placeholder={singleProduct?.flavor||"add flavour"} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <input type="text" name="stock" placeholder={singleProduct?.stock?.toString()+" (stock)"} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <input type="text" name="volume" placeholder={singleProduct?.volume+" (volume)"} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <input type="text" name="weight" placeholder={singleProduct?.weight+" (weight)"} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <input type="text" name="tag" placeholder={singleProduct?.tag.join(",")+" (tags)"} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <input type="text" name="warning" placeholder={singleProduct?.warning?.join(",")+" (warnings)"} className="border border-gray-200 px-3 py-2 w-full"
                            onChange={onChangeHandler}
                        />
                        <button className="border border-blue-500 px-3 py-2 block w-full bg-blue-400 text-white font-semibold"
                            onClick={onClickHandler}
                        >Update</button>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default UpdateProduct;
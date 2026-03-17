import { apiHandler } from "./userApi";


export interface ProductTypes {
    _id:string;
    name:string;
    price:number;
    category:"fresh"|"juice"|"frozen"|"smoothie"|"null";
    tag:string[];
    description?: string;
    image?: string;
    previewImages?: string[];
    stock?: number;
    weight?: string;
    volume?: string;
    ingredients?: string[];
    nutritionFacts?: {
        servingSize: string;
        servingsPerContainer: number;
        protein: number;
        carbs: number;
        fat: number;
        calories: number;
    };
    rating: number;
    avgRating:number;
    numReviews: number;
    flavor?:string;
    warning?:string[];
    soldCount:number;
    returnCount:number;
};
export type CreateProductBodyTypes = Pick<ProductTypes, "name"|"price"|"description"|"category"|"weight"|"volume"|"tag">
export type UpdateProductBodyTypes = Partial<Pick<ProductTypes, "name"|"price"|"description"|"category"|"weight"|"volume"|"stock">>&{tag?:string; warning?:string;};



export async function allProducts() {
    const res = await apiHandler<null, ProductTypes[]>({
        endPoint:"/product/all",
        method:"GET",
        credentials:"include"
    });
    return res;
};
export async function getSingleProduct({productID}:{productID?:string;}) {
    if (!productID) throw Error("productID not found");
    console.log({p:productID});
    
    const res = await apiHandler<null, ProductTypes>({
        endPoint:`/product/single_product/${productID}`,
        method:"GET",
        credentials:"include"
    });
    console.log({res});
    
    return res;
};
export async function createProduct(createProductFormData:CreateProductBodyTypes) {
    const {name, price, description, category} = createProductFormData;
    if (!name || !price || !description || !category) throw new Error("all fields are required");

    const res = await apiHandler({
        endPoint:"/product/create",
        method:"POST",
        credentials:"include",
        body:createProductFormData
    });
    return res;
};
export async function updateProduct({productID, updateForm}:{productID:string; updateForm:UpdateProductBodyTypes}) {
    if (!productID) throw new Error("productID is undefined");
    
    const res = await apiHandler({
        endPoint:`/product/update/${productID}`,
        method:"PATCH",
        credentials:"include",
        body:updateForm
    });
    return res;
};
export async function uploadProductImage(formData:FormData) {    
    const res = await apiHandler<FormData, {imagePath:string;}>({
        endPoint:`/product/upload_image`,
        method:"POST",
        credentials:"include",
        body:formData
    });
    return res;
};
export async function uploadProductPreviewImages(formData:FormData) {    
    const res = await apiHandler<FormData, {previewImagesPath:string[]}>({
        endPoint:`/product/upload_images`,
        method:"POST",
        credentials:"include",
        body:formData
    });
    return res;
};
export async function deleteProduct({productID}:{productID:string;}) {
    if (!productID) throw new Error("productID is undefined");
    
    const res = await apiHandler({
        endPoint:`/product/delete/${productID}`,
        method:"DELETE",
        credentials:"include"
    });
    return res;
};
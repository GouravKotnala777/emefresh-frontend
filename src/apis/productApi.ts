import { apiHandler } from "./userApi";


export interface ProductTypes {
    _id:string;
    name:string;
    price:number;
    category:"fresh"|"juice"|"frozen"|"smoothie"|"null";
    tag:string[];
    description?: string;
    images?: string[];
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



export async function allProducts() {
    const res = await apiHandler<null, ProductTypes[]>({
        endPoint:"/product/",
        method:"GET",
        credentials:"include"
    });
    return res;
};
export async function createProduct(registerFormData:CreateProductBodyTypes) {
    //const {name, price, description, category, weight, volume, tag} = registerFormData;
    //if (!name || !price || !description || !category) throw new Error("all fields are required");

    const res = await apiHandler({
        endPoint:"/product/",
        method:"POST",
        credentials:"include",
        body:registerFormData
    });
    return res;
};
export async function updateProduct({productID}:{productID:string;}) {
    if (!productID) throw new Error("productID is undefined");
    
    const res = await apiHandler({
        endPoint:`/product/${productID}`,
        method:"PATCH",
        credentials:"include"
    });
    return res;
};
export async function deleteProduct({productID}:{productID:string;}) {
    if (!productID) throw new Error("productID is undefined");
    
    const res = await apiHandler({
        endPoint:`/product/${productID}`,
        method:"DELETE",
        credentials:"include"
    });
    return res;
};
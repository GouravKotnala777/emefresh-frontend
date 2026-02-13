type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface APIHandlerTypes<BodyTypes>{
    endPoint:string;
    method:HTTPMethod;
    headers?:HeadersInit;
    credentials?:RequestCredentials;
    body?:BodyTypes;
};


export async function apiHandler<BodyTypes, ResType>({endPoint, method, headers={"content-type":"application/json"}, credentials, body}:APIHandlerTypes<BodyTypes>):Promise<{success:boolean; message:string; jsonData:ResType|null;}> {
    try {
        const isFormData = body instanceof FormData;
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1${endPoint}`, {
            method,
            headers:(isFormData)?
                headers
                :
                {
                    "content-type":"application/json",
                    ...headers
                },
            credentials,
            body:(method === "GET" || method === "DELETE") ?
                    null
                    :
                    (isFormData) ?
                        body
                        :
                        JSON.stringify(body)
        }); 

        const data = await res.json() as {success:boolean; message:string; jsonData:ResType};
        return data;        
    } catch (error) {
        const message = (error instanceof Error) ? error.message : "something went wrong";
        return {success:false, message, jsonData:null};
    }
};

export interface UserTypes {
    _id:string;
    name:string;
    email:string;
    password:string;
    role:"user"|"admin";
    isVarified:boolean;
    varificationToken:string;
    avatar?:string;
    createdAt:string;
    updatedAt:string;
};
export type RegisterBodyTypes = Pick<UserTypes, "name"|"email"|"password">;
export type LoginBodyTypes = Pick<UserTypes, "email"|"password">;

export async function register(registerFormData:RegisterBodyTypes) {
    const {name, email, password} = registerFormData;
    if (!name || !email || !password) throw new Error("all fields are required");

    const res = await apiHandler({
        endPoint:"/user/register",
        method:"POST",
        credentials:"include",
        body:registerFormData
    });
    return res;
};

export async function login(loginFormData:LoginBodyTypes) {
    const {email, password} = loginFormData;
    if (!email || !password) throw new Error("all fields are required");

    const res = await apiHandler({
        endPoint:"/user/register",
        method:"POST",
        credentials:"include",
        body:loginFormData
    });
    return res;
};

// apiHandler<bodyTypes, ResTypes> i know resTypes is unknown but why bodyTypes is LoginBodyTypes if we have not assigned type here
//function apiHandler<LoginBodyTypes, unknown>({ url, method, headers, credentials, body }: APIHandlerTypes<LoginBodyTypes>): Promise<{
//    success: boolean;
//    message: string;
//    jsonData: unknown;
//}>

export async function myProfile() {
    const res = await apiHandler<null, UserTypes>({
        endPoint:"/user/my_profile",
        method:"GET",
        credentials:"include"
    });
    return res;
};
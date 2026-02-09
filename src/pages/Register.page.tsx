import { useState, type ChangeEvent, type MouseEvent } from "react";
import { register } from "../apis/userApi";


function Register() {
    const [formData, setFormData] = useState<{name:string; email:string; password:string; c_password:string;}>({name:"", email:"", password:"", c_password:""});

    function onChangeHandler(e:ChangeEvent<HTMLInputElement>) {
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    async function registerHandler(e:MouseEvent<HTMLButtonElement>) {
        try {
            e.preventDefault();
            const {password, c_password} = formData;
            if (password !== c_password) throw new Error("password and confirm password are different");
    
            const res = await register(formData);
            console.log("////////////////// 1");
            console.log(res);
            console.log("////////////////// 2");
        } catch (error) {
            throw error;
        }

    }
    
    return(
        <section className="h-screen flex justify-center items-center">
            <div className="max-w-full w-sm bg-white mx-3 p-3 rounded-lg">
                <h1 className="text-neutral-700 font-bold text-lg text-center py-2">User Register</h1>
                <form className="flex flex-col gap-3 mt-3 text-sm">
                    <input type="text" name="name" placeholder="User Name" className="p-2" onChange={onChangeHandler} />
                    <input type="text" name="email" placeholder="Email" className="p-2" onChange={onChangeHandler} />
                    <input type="text" name="password" placeholder="Password" className="p-2" onChange={onChangeHandler} />
                    <input type="text" name="c_password" placeholder="Confirm Password" className="p-2" onChange={onChangeHandler} />
                    <button className="bg-sky-500 py-2 font-semibold text-white rounded-md [box-shadow:0px_0px_4px_0.2px_gray] hover:opacity-80 transition-all ease-in-out duration-300" onClick={registerHandler}>Register</button>
                </form>
            </div>
        </section>
    )
}

export default Register;



//const [formData, setFormData] = useState<{name:string; email:string; password:string;}|null>(null);

//function onChangeHandler(e:ChangeEvent<HTMLInputElement>) {
//    setFormData({...formData, [e.target.name]:e.target.value});
//};

//how to handle this error :-

//Argument of type '{ name?: string | undefined; email?: string | undefined; password?: string | undefined; }' is not assignable to parameter of type 'SetStateAction<{ name: string; email: string; password: string; } | null>'.
//  Type '{ name?: string | undefined; email?: string | undefined; password?: string | undefined; }' is not assignable to type '{ name: string; email: string; password: string; }'.
//    Types of property 'name' are incompatible.
//      Type 'string | undefined' is not assignable to type 'string'.
//        Type 'undefined' is not assignable to type 'string'.ts(2345)


//i know it is because of initial value of formData is set to null
import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { UserTypes } from "../apis/userApi";

interface UserContextTypes{
    user:UserTypes|null;
    setUser:Dispatch<SetStateAction<UserTypes|null>>;
    isUserAuthenticated():boolean;
    isUserAdmin():boolean;
}

export const UserContext = createContext<UserContextTypes|null>(null);

export function UserProvider({children}:{children:ReactNode}) {
    const [user, setUser] = useState<UserTypes|null>(null);

    function isUserAuthenticated() {
        return (!!user && typeof user === "object" && user.toString() !== "{}");
    };
    function isUserAdmin() {
        return (!!user && user.role === "admin");
    };
    
    return(
        <UserContext.Provider value={{user, setUser, isUserAuthenticated, isUserAdmin}}>
            {children}
        </UserContext.Provider>
    )
};
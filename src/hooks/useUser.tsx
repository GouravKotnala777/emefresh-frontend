import { useContext } from "react";
import { UserContext } from "../contexts/userContext";


function useUser() {
    const context = useContext(UserContext);

    if (!context) throw new Error("seUser must be provided inside UserContext");

    return(context);
}

export default useUser;
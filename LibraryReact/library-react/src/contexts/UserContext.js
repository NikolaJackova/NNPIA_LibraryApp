import {createContext, useState} from "react";
import AuthService from "../services/AuthService";

export const userContext = createContext(undefined);

export const UserProvider = ({children}) => {
    const [value, setValue] = useState(AuthService.getCurrentUser())


    return (
        <userContext.Provider value={[value, setValue]}>
            {children}
        </userContext.Provider>
    )
}
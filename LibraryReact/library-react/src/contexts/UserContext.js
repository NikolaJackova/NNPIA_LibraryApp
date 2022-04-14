import {createContext, useState} from "react";

export const userContext = createContext({});

export const UserProvider = ({children}) => {
    const [value, setValue] = useState()

    return (
        <userContext.Provider value={[value, setValue]}>
            {children}
        </userContext.Provider>
    )
}
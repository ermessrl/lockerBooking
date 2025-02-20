import React, {createContext, useState} from "react";

export const LoginDetailsContext = createContext();

export const LoginDetailsProvider = ({children}) => {

    const [loginDetails, setLoginDetails] = useState(null);

    return(
        <LoginDetailsContext.Provider value={{loginDetails, setLoginDetails}}>
            {children}
        </LoginDetailsContext.Provider>
    );
};
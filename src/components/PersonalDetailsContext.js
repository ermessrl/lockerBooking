import React, {createContext, useState} from "react";

export const PersonalDetailsContext = createContext();

export const PersonalDetailsProvider = ({children}) => {

    const [personalData, setPersonalData] = useState(null);

    return(
        <PersonalDetailsContext.Provider value={{personalData, setPersonalData}}>
            {children}
        </PersonalDetailsContext.Provider>
    );
};
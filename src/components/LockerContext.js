import React, {createContext, useState} from "react";

export const LockerContext = createContext();

export const LockerProvider = ({children}) => {

    const [lockers, setLockers] = useState(null);
    const [selectedLocker, setSelectedLocker] = useState(null); 

    return(
        <LockerContext.Provider value={{ lockers, setLockers, selectedLocker, setSelectedLocker }}>
            {children}
        </LockerContext.Provider>
    );
};
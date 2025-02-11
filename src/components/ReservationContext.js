import React, {createContext, useState} from "react";

export const ReservationContext = createContext();

export const ReservationProvider = ({children}) => {

    const [reservationData, setReservationData] = useState(null);

    return(
        <ReservationContext.Provider value={{reservationData, setReservationData}}>
            {children}
        </ReservationContext.Provider>
    );
};
import React, { useEffect, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { ReservationContext } from "./ReservationContext";
import { PersonalDetailsContext } from "./PersonalDetailsContext";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });


export function ConfirmDetailsPage(){
    const {reservationData, setReservationData } = useContext(ReservationContext);
    const personalData = useContext(PersonalDetailsContext);
    const [userBooking, setUserBooking] = useState([]);
    Swal.fire('Success!','Your booking is complete.','success');
    useEffect(() => {
      const storedData = localStorage.getItem("reservationData");
      const reservationData = storedData ? JSON.parse(storedData) : null;
    
      setReservationData(reservationData);
  
      if (personalData?.userBooking) {
        setUserBooking(personalData.userBooking);
      } else {
        const storedPersonalData = JSON.parse(localStorage.getItem('personalData'));
        setUserBooking(storedPersonalData?.userBooking || []);
      }
    }, [personalData, setReservationData]);
  
    if (userBooking.length === 0) {
      return <p>No booking details available.</p>;
    }
    const formattedDropDate = dayjs(reservationData.checkInDate).format("DD/MM/YY");
    const formattedDropTime = dayjs(reservationData.checkInDate).format("HH:mm");
    const formattedPickUpDate = dayjs(reservationData.checkOutDate).format("DD/MM/YY");
    const formattedPickUpTime = dayjs(reservationData.checkOutDate).format("HH:mm");
    const position = [parseFloat(reservationData.selectedLocker.latitude), parseFloat(reservationData.selectedLocker.longitude)]; // [latitude, longitude]
    const payment_message = "Payment will be made at the locker upon luggage drop-off.\nIn the event of a late pick-up after the designated deposit period,an additional fee will be charged based on the extra time of the delay.";
    const handlePrint = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setFont("helvetica","bold");
        doc.text("Your booking Confirmation", 70, 10);
        doc.setFontSize(15);
        doc.setTextColor(0,0,255);
        doc.text(`Hi ${userBooking[0]?.customerFullName}`, 10, 35)
        doc.text(`Your email: ${userBooking[0]?.customerEmail}`, 10, 45)
        doc.text(`Your Phone: ${userBooking[0]?.customerPhoneNumber}`, 10, 55)
        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.text(`Drop off: ${formattedDropDate} at ${formattedDropTime}`, 10, 75);
        doc.text(`Pick up: ${formattedPickUpDate} at ${formattedPickUpTime}`, 10, 85);
        doc.text(`${reservationData.selectedLocker.lockerName} at ${reservationData.selectedLocker.address}`, 10, 95);
        doc.text(`Total Amount: €${reservationData.grandTotal}`, 10, 105)
        autoTable(doc, {
            startY: 125,
            head: [["Unlock Identifier","Unlock Code", "Dimension"]],
            body: userBooking?.map((userBooking) => [
                userBooking.unlockIdentifier,
                userBooking.unlockPin,
                userBooking.dimension,
            ]),
            styles: { halign: "center" },
          });
        doc.setFontSize(12);
        doc.setFont("helvetica","normal");
        doc.text(`For assistance contact: ${reservationData.selectedLocker.lockerPhone} or email to ${reservationData.selectedLocker.lockerEmail}`,10,200);
        doc.setFontSize(8);
        doc.setFont("helvetica","normal");
        doc.text(`${payment_message}`,10,220);
        doc.save("Booking_Confirmation.pdf");
    };
    // const paymentDetailsAPI = {
    //     lockerCode : "Test-Locker-001",
    //     timestamp:"2024-04-20T12:00:00",
    //     bookingId: 1,
    //     finalPrice : 900,
    //     type : "Gateway Name",
    //     paymentComplete : true,
    //     receipt : "   POS TEST    |        POS IM20        |Eser.         xxxxxxxxxx|DATA 22/02/23  ORA 09:17|TML 10000075 STAN xxxxxx|AUT. xxxxxx OPER. xxxxxx|IMPORTO             9,00|                        |"
    // };
    // const setPayment = async (paymentDetails) => {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         const isValid = JSON.stringify(paymentDetails) === JSON.stringify(paymentDetailsAPI);
    //         if (isValid){
    //           resolve({status: "OK", message: "Payment done successfully"});
    //         }else{
    //           reject
    //           ({status: "KO", message: "Invalid request"});
    //         }
    //       }, 1000);
    //     });
    //   };
    // const handlePayment = async() => {
    //     const paymentDetails = {
    //         lockerCode : "Test-Locker-001",
    //         timestamp:"2024-04-20T12:00:00",
    //         bookingId: 1,
    //         finalPrice : 0,
    //         type : "Gateway Name",
    //         paymentComplete : true,
    //         receipt : "   POS TEST    |        POS IM20        |Eser.         xxxxxxxxxx|DATA 22/02/23  ORA 09:17|TML 10000075 STAN xxxxxx|AUT. xxxxxx OPER. xxxxxx|IMPORTO             9,00|                        |"
    //     };
    //     try{
    //         const response = await setPayment(paymentDetails);
    //         console.log("Payment response: ", response);
    //       }catch(error){
    //         console.log("booking failed: ", error);
    //         Swal.fire('Error!',`Payment failed. ${error.message}`, 'error');
    //       }
    // };
    return(
        <>
        <div className="landing">
            <div className="confirm-layout">{/*confirm layout */}
                <div className="confirm-top">{/*display details */}
                    <div>
                    <h5>Your booking is complete {userBooking[0]?.customerFullName}</h5>
                    <h5 style={{ color: "red" }}>Thank you for booking with us.</h5>
                    <h5 style={{ color: "purple" }}>You will soon receive an email confirmation.</h5>
                    </div>
                    <div className="box_datetime">
                    <p><i className="fa-solid fa-print icon-large" ></i></p>
                    <button className="dialog-button" onClick={()=>{handlePrint()}}>Print this Page </button>
                    </div>
                </div>
                <div className="confirm-content" >
                    <div className="confirm-layout" style={{width:"80%"}}>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Unlock Identifier</StyledTableCell>
                                        <StyledTableCell>Unlock Code</StyledTableCell>
                                        <StyledTableCell align="left">Dimension</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userBooking.map((userBooking, index) => (
                                        <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">{userBooking.unlockIdentifier}</StyledTableCell>
                                        <StyledTableCell align="left">{userBooking.unlockPin}</StyledTableCell>
                                        <StyledTableCell align="left">{userBooking.dimension}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="total-summary">
                            <div className="box_datetime">
                                <p className="confirm-label">Drop off: </p><p><strong>{formattedDropDate} at {formattedDropTime}</strong></p>
                            </div>
                            <div className="box_datetime">
                                <p className="confirm-label">Pick Up: </p><p><strong>{formattedPickUpDate} at {formattedPickUpTime}</strong></p>
                            </div>
                            <div className="box_datetime">
                                <p className="confirm-label">Total: </p><p><strong>€ {reservationData.grandTotal}</strong></p>
                            </div>
                            <div className="box_datetime">
                                <p className="confirm-label">Email: </p><p><strong>{userBooking[0]?.customerEmail}</strong></p>
                            </div>
                            <div className="box_datetime">
                                <p className="confirm-label">Phone: </p><p><strong>{userBooking[0]?.customerPhoneNumber}</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="confirm-layout">
                        <div className="confirm-content" >
                            <div className="box">
                            <p><i className="fa-solid fa-clock icon"></i><strong>Open:</strong> {reservationData.selectedLocker.openingTime} - {reservationData.selectedLocker.closingTime}</p>
                            <p><i className="fa-solid fa-location-dot icon"></i> {reservationData.selectedLocker.city}</p>
                            <p><i className="fa-solid fa-building icon"></i> {reservationData.selectedLocker.address}</p>
                            <p><i className="fa-solid fa-phone icon"></i> {reservationData.selectedLocker.lockerPhone} </p>
                            <p><i className="fa-solid fa-envelope icon"></i> {reservationData.selectedLocker.lockerEmail} </p>
                            </div>
                            <div style={{ height: "300px", width: "60%" }}>
                                <MapContainer center={position} zoom={16} style={{ height: "300px", width: "100%" }}>
                                    <TileLayer 
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                    />
                                    <Marker position={position}>
                                    <Popup>{reservationData.selectedLocker.address}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>{/*Map */}
                        </div> {/*confirm content div */}
                        {/*<div style={{"paddingTop":"5rem", "paddingLeft":"1rem"}}>
                            <button className="cta-button" onClick={()=>{handlePayment()}}>Pay</button>
                        </div>*/}
                    </div>{/*confirm layout div */}
                </div>
            </div> {/*confirm layout div */}
            <p style={{ fontSize: "14px" }}>{payment_message}</p>
        </div> {/*landing div */}
        <Outlet/>
        </>
    );
}

export default ConfirmDetailsPage;
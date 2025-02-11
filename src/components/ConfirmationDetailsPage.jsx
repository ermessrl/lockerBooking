import React, { useEffect, useContext } from "react";
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


export function ConfirmDetailsPage(){
    const {reservationData, setReservationData } = useContext(ReservationContext);
    const {personalData, setPersonalData} = useContext(PersonalDetailsContext);
    useEffect(() => {
        const storedData = localStorage.getItem("reservationData");
        const storedPersonalData = localStorage.getItem("personalData");
        if (storedData && storedPersonalData) {
            setReservationData(JSON.parse(storedData));
            setPersonalData(JSON.parse(storedPersonalData));
        }
    }, [setReservationData, setPersonalData]);
    const formattedDropDate = dayjs(reservationData.selectedDropDate).format("DD/MM/YY");
    const formattedDropTime = dayjs(reservationData.selectedDropTime).format("h:mm A");
    const formattedPickUpDate = dayjs(reservationData.selectedPickUpDate).format("DD/MM/YY");
    const formattedPickUpTime = dayjs(reservationData.selectedPickUpTime).format("h:mm A");
    console.log("Locker Data:", reservationData?.selectedLocker);
    console.log("Latitude:", reservationData.selectedLocker.latitude, "Longitude:", reservationData.selectedLocker.longitude);
    const position = [parseFloat(reservationData.selectedLocker.latitude), parseFloat(reservationData.selectedLocker.longitude)]; // [latitude, longitude]
    const payment_message = "Payment will be made at the locker upon luggage drop-off.\nIn the event of a late pick-up after the designated deposit period,an additional fee will be charged based on the extra time of the delay.";
    const handlePrint = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setFont("helvetica","bold");
        doc.text("Your booking Confirmation", 70, 10);
        doc.setFontSize(15);
        doc.setTextColor(0,0,255);
        doc.text(`Hi ${personalData.surname}`, 10, 35)
        doc.text(`Your email: ${personalData.email}`, 10, 45)
        doc.text(`Your Phone: ${personalData.contact}`, 10, 55)
        doc.setFontSize(12);
        doc.setTextColor(0,0,0);
        doc.text(`Drop off: ${formattedDropDate} at ${formattedDropTime}`, 10, 75);
        doc.text(`Pick up: ${formattedPickUpDate} at ${formattedPickUpTime}`, 10, 85);
        doc.text(`${reservationData.selectedLocker.lockerName} at ${reservationData.selectedLocker.address}`, 10, 95);
        doc.text(`Total Amount: €${reservationData.grandTotal}`, 10, 105)
        autoTable(doc, {
            startY: 125,
            head: [["Unlock Identifier","Unlock Code", "Dimension"]],
            body: personalData.reservationCodes.map((entry) => [
                personalData.contact,
                entry.code,
                entry.dimension,
            ]),
            styles: { halign: "center" },
          });
        doc.setFontSize(12);
        doc.setFont("helvetica","normal");
        doc.text(`For assistance contact: ${reservationData.selectedLocker.phone} or email to ${reservationData.selectedLocker.contact}`,10,200);
        doc.setFontSize(8);
        doc.setFont("helvetica","normal");
        doc.text(`${payment_message}`,10,220);
        doc.save("Booking_Confirmation.pdf");
    };
    return(
        <>
        <div className="landing">
            <div className="confirm-layout">{/*confirm layout */}
                <div className="confirm-top">{/*display details */}
                    <div>
                    <h5>Your booking is complete {personalData.surname}, {personalData.name}</h5>
                    <h5 style={{ color: "red" }}>Thank you for booking with us.</h5>
                    <h5 style={{ color: "purple" }}>You will soon receive an email confirmation.</h5>
                    </div>
                    <div className="box_datetime">
                    <p><i className="fa-solid fa-print icon-large" ></i></p>
                    <button className="dialog-button" onClick={()=>{handlePrint()}}>Print this Page </button>
                    </div>
                </div>
                <div className="confirm-content" >
                    <div className="confirm-layout" style={{width:"100%"}}>
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
                                    {personalData.reservationCodes.map((entry, index) => (
                                        <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">{personalData.contact}</StyledTableCell>
                                        <StyledTableCell align="left">{entry.code}</StyledTableCell>
                                        <StyledTableCell align="left">{entry.dimension}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="total-summary">
                            <div className="box_datetime">
                                <p className="summary-label">Drop off: </p><p><strong>{formattedDropDate} at {formattedDropTime}</strong></p>
                            </div>
                            <div className="box_datetime">
                                <p className="summary-label">Pick Up: </p><p><strong>{formattedPickUpDate} at {formattedPickUpTime}</strong></p>
                            </div>
                            <div className="box_datetime">
                                <p className="summary-label">Total: </p><p><strong>€ {reservationData.grandTotal}</strong></p>
                            </div>
                            <div className="box_datetime">
                                <p className="summary-label">Email: </p><p><strong>{personalData.email}</strong></p>
                            </div>
                            <div className="box_datetime">
                                <p className="summary-label">Phone: </p><p><strong>{personalData.contact}</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="confirm-content" >
                        <div className="box">
                        <p>{reservationData.selectedLocker.lockerName}</p>
                        <p>{reservationData.selectedLocker.address}</p>
                        <p><i className="fa-solid fa-phone icon"></i>{reservationData.selectedLocker.phone}</p>
                        <p><i className="fa-solid fa-envelope icon"></i>{reservationData.selectedLocker.contact}</p>
                        </div>
                        <div style={{ height: "300px", width: "80%" }}>
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
                </div>
            </div> {/*confirm layout div */}
            <p style={{ fontSize: "14px" }}>{payment_message}</p>
        </div> {/*landing div */}
        <Outlet/>
        </>
    );
}

export default ConfirmDetailsPage;
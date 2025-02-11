import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { mockUserBookings } from "../api/mockData";
import { USE_MOCK_DATA } from "../config";

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
  
function ManageBookingPage() {
  const [userBookings, setUserBookings] = useState([]);
  useEffect(() => {
    if(USE_MOCK_DATA){
      setUserBookings(mockUserBookings);
    }else {
      fetch("/api/userBookings")
        .then(response => response.json())
        .then(data => setUserBookings(data))
        .catch(error => console.error("Error fetching data:", error));
    }
  }, []);
  const rBooking = [
    {lockerCode: "Test-Locker-001", timestamp:"2024-04-21T12:00:00", unlockIdentifier: "+391234567890",unlockPin: "12345678"},
  ];
  const [dropDate, dropTime] = rBooking[0].timestamp.split("T");
  const filteredBooking = userBookings.filter(uBooking => 
    uBooking.lockerCode === rBooking[0].lockerCode &&
    uBooking.checkInDate === rBooking[0].timestamp &&
    uBooking.unlockIdentifier === rBooking[0].unlockIdentifier &&
    uBooking.unlockPin === rBooking[0].unlockPin
  );
  const [pickUpDate, setPickUpDate] = useState(null);
  const [pickUpTime, setPickUpTime] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [customerEmail, setCustomerEmail] = useState(null);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(null);
  const [unlockCode, setUnlockCode] = useState(null);
  const [dimension, setDimension] = useState(null);
  useEffect(() => {
    if (filteredBooking.length > 0) {
      const [date, time] = filteredBooking[0]?.checkInDate.split("T");
      setPickUpDate(date);
      setPickUpTime(time);
      setFinalPrice(filteredBooking[0]?.finalPrice);
      setCustomerEmail(filteredBooking[0]?.customerEmail);
      setCustomerPhoneNumber(filteredBooking[0]?.customerPhoneNumber);
      setUnlockCode(filteredBooking[0]?.unlockPin);
      setDimension(filteredBooking[0]?.dimension);
    }
  }, [filteredBooking]);
  const handleDelete = () => {
    alert('Deleted');
  }
    return(
        <>
        <div className="landing">
          <div className="box-list">
            <h4>Manage your booking</h4>
            <h5> Hello, Priyanka Rajendran</h5>
            <p style={{"fontSize":"16px"}}> Please find below your booking details.<br/>
             <strong>Your Drop off:</strong> {dropDate} at {dropTime}  &nbsp; &nbsp;
             <strong>Your Pick up: </strong>{pickUpDate} at {pickUpTime} &nbsp; &nbsp;
             <strong>Total amount paid: </strong> € {(finalPrice/100).toFixed(2)}<br/>
             <strong>email: </strong>{customerEmail}&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
             <strong>contact: </strong> {customerPhoneNumber}</p>
          </div>
          <div style={{"width":"90%", "padding":"0rem0rem0rem5rem"}}>
            <TableContainer component={Paper}>
            <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                          <StyledTableCell>Unlock Identifier</StyledTableCell>
                          <StyledTableCell align="left">Unlock Code</StyledTableCell>
                          <StyledTableCell align="left">Dimension</StyledTableCell>
                          <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow >
                      <StyledTableCell component="th" scope="row">{unlockCode}</StyledTableCell>
                      <StyledTableCell align="left">{customerPhoneNumber}</StyledTableCell>
                      <StyledTableCell align="left">{dimension}</StyledTableCell>
                      <StyledTableCell align="left"><i className="fa-solid fa-trash-can icon" onClick={() =>{handleDelete()}}></i></StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
          </div>
        </div>{/*landing*/}
        </>
    );
}
export default ManageBookingPage;
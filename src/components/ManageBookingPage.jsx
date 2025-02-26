import React, { useEffect, useState, useContext } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from "dayjs";
import { Outlet } from "react-router-dom";
import { LoginDetailsContext } from "./LoginDetailsContext";
import Swal from "sweetalert2";
import axios from "axios";
import {formatCurrency} from "../utils/utils";

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

  // useEffect(() => {
  //   if(USE_MOCK_DATA){
  //     setUserBookings(mockUserBookings);
  //   }else {
  //     fetch("/api/userBookings")
  //       .then(response => response.json())
  //       .then(data => setUserBookings(data))
  //       .catch(error => console.error("Error fetching data:", error));
  //   }
  // }, []);

  const [filteredBookings, setFilteredBookings] = useState([]);
  const [customerFullName, setCustomerFullName] = useState(null);
  const [customerEmail, setCustomerEmail] = useState(null);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(null);
  const {loginDetails, setLoginDetails } = useContext(LoginDetailsContext);
  const [dataFetched, setDataFetched] = useState(false); 
  useEffect(() => {
      const storedData = localStorage.getItem("loginDetails");
      if (storedData) {
        setLoginDetails(JSON.parse(storedData));
  }
  }, [setLoginDetails]);

  // useEffect(() => {
  //   setFilteredBookings(userBookings.filter(uBooking => 
  //     uBooking.unlockIdentifier === loginDetails.unlockIdentifier && uBooking.checkOutDate < formattedDate));//&& uBooking.checkOutDate < today
  // }, [userBookings, loginDetails, formattedDate]);
  
  // Initialize userBookings when loginDetails is available
useEffect(() => {
  if (loginDetails.userBookings.length > 0) {
    setUserBookings(loginDetails.userBookings);
    setDataFetched(true);
  }
}, [loginDetails]);

useEffect(() => {
  if (dataFetched) {
    const now = dayjs().format('YYYY-MM-DDTHH:mm:ss'); 

    const filtered = userBookings.filter(
      (uBooking) =>
        uBooking.unlockIdentifier === loginDetails.unlockIdentifier &&
        uBooking.checkOutDate > now &&
        (uBooking.bookingStatus === 'ACTIVE' || uBooking.bookingStatus === 'IN_USE')
    );

    setFilteredBookings(filtered);
    if (filtered.length === 0) {
      Swal.fire('Error!', 'No active bookings found.', 'error');
    }
  }
}, [userBookings, dataFetched, loginDetails]);
  console.log('filtered bookings', filteredBookings);
  useEffect(() => {
  if(dataFetched){
    if (filteredBookings.length > 0) {
      setCustomerFullName(filteredBookings[0]?.customerFullName);
      setCustomerEmail(filteredBookings[0]?.customerEmail);
      setCustomerPhoneNumber(filteredBookings[0]?.customerPhoneNumber);
    }
    // else{
    //   Swal.fire('Error!',`No active bookings found.`,'error');
    // }
  }
  }, [filteredBookings, dataFetched]);
  // const updateBookingDetailsAPI = {
  //   lockerCode : "Test-Locker-001",
  //   timestamp:"2024-04-20T12:00:00",
  //   box: "01",
  //   checkInDate: "2024-04-20T12:00:00",
  //   checkOutDate: "2024-04-21T12:00:00",
  //   customerFullName: "Test User",
  //   customerEmail: "Test.User@testuser.testuser",
  //   customerPhoneNumber: "+391234567890",
  //   onlinePayment: false,
  //   paymentComplete: false
  // };
  // const updateBooking = async (updateBookingDetails) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const isValid = JSON.stringify(updateBookingDetails) === JSON.stringify(updateBookingDetailsAPI);
  //       if (isValid){
  //         resolve({status: "OK", message: "Updated booking successfully."});
  //       }else{
  //         reject
  //         ({status: "KO", message: "Invalid request"});
  //       }
  //     }, 1000);
  //   });
  // };
    const handleDelete = async (booking) => {
      try {
        console.log({
          lockerCode: booking.lockerCode,
          bookingId: booking.bookingId,
        });
    
        const response = await axios.delete(
          `https://dev.ermes-srv.com/test_priyanka/be/v8/booking/${booking.bookingId}`,
          {
            data: {
              lockerCode: booking.lockerCode,
              bookingId: booking.bookingId,
            },
          }
        );
        console.log("Delete booking response: ", response.data);
        // Update userBookings state after deletion
        setUserBookings((prevBookings) =>
          prevBookings.filter((b) => b.bookingId !== booking.bookingId)
        );
    
        Swal.fire("Success!", "Your booking has been deleted.", "success");
      } catch (error) {
        console.error("Delete booking failed: ", error);
        Swal.fire("Error!", `Cannot delete booking. ${error.message}`, "error");
      }
    };
  return(
      <>
      <div className="landing">
        <div className="box-list-manage-booking">
          <h4>Manage your booking</h4>
          <h5> Hello, {customerFullName} </h5>
          <p style={{"fontSize":"16px"}}> Please find below your booking details.<br/>
            <strong>Email: </strong>{customerEmail}&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            <strong>Phone number: </strong> {customerPhoneNumber}</p>
        </div>
        <div style={{width:"90%", padding: '16px', marginBottom: "15rem" }}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                  <TableRow>
                    <StyledTableCell>Phone number</StyledTableCell>
                    <StyledTableCell align="left">Unlock Code</StyledTableCell>
                    <StyledTableCell align="left">Dimension</StyledTableCell>
                    <StyledTableCell align="left">Drop-off time</StyledTableCell>
                    <StyledTableCell align="left">Pick-up time</StyledTableCell>
                    <StyledTableCell align="left">Price</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((booking, index)=>(
                <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{booking.unlockIdentifier}</StyledTableCell>
                <StyledTableCell align="left">{booking.unlockPin}</StyledTableCell>
                <StyledTableCell align="left">{booking.dimension}</StyledTableCell>
                <StyledTableCell align="left">{dayjs(booking.checkInDate).format("DD/MM/YY")} at {dayjs(booking.checkInDate).format("hh:mm")}</StyledTableCell>
                <StyledTableCell align="left">{dayjs(booking.checkOutDate).format("DD/MM/YY")} at {dayjs(booking.checkOutDate).format("hh:mm")}</StyledTableCell>
                <StyledTableCell align="left"> {formatCurrency((booking.finalPrice/100).toFixed(2), "it-IT", "EUR")}</StyledTableCell>
                <StyledTableCell align="left"><i className="fa-solid fa-trash-can icon" onClick={() =>{handleDelete(booking)}}></i></StyledTableCell>
                </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>{/*landing*/}
      <Outlet/>
      </>
  );
}
export default ManageBookingPage;
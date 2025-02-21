import React, { useEffect, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
import { TextField } from "@mui/material";
import dayjs from "dayjs";
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
  
function PersonalDetailsPage() {
    const {reservationData, setReservationData } = useContext(ReservationContext);
    const {setPersonalData} = useContext(PersonalDetailsContext);
    const [userBooking, setUserBooking] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem("reservationData");
        if (storedData) {
            setReservationData(JSON.parse(storedData));
    }
    }, [setReservationData]);
    // const generateReservationCodes = (counts) => {
    //     let codes = [];
    //     Object.keys(counts).forEach((dimension) => {
    //       for (let i = 0; i < counts[dimension]; i++) {
    //         codes.push({
    //           code: `${Math.floor(Math.random() * 100000000)}`.padStart(8, "0"),
    //           dimension: dimension,
    //         });
    //       }
    //     });
    //     return codes;
    //   };
    
      // useEffect(() => {
      //   if (reservationData && reservationData.counts) {
      //       console.log(reservationData.counts); //{SMALL: 3, MEDIUM: 3, LARGE: 1}
      //     setReservationCodes(generateReservationCodes(reservationData.counts));
      //   }
      // }, [reservationData]);
    const formattedDropDate = dayjs(reservationData.checkInDate).format("DD/MM/YY");
    const formattedDropTime = dayjs(reservationData.checkInDate).format("HH:mm");
    const formattedPickUpDate = dayjs(reservationData.checkOutDate).format("DD/MM/YY");
    const formattedPickUpTime = dayjs(reservationData.checkOutDate).format("HH:mm");
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [errors, setErrors] = useState({});
    const timestamp = dayjs().format('YYY-MM-DDTHH:mm:ss');
    const navigate = useNavigate();
    const validateFields = () => {
        let tempErrors = {};
        if (!name) tempErrors.name = "Please enter your name";
        if (!surname) tempErrors.surname = "Please enter your surname";
        if (!email) tempErrors.email = "Please enter your email";
        if (!contact) tempErrors.contact = "Please enter your contact";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; 
    };
    console.log('reservation Data',reservationData);
    useEffect(() => {
      console.log('userBooking updated:', userBooking);
    }, [userBooking]);    
    const selectedDimensions = Object.entries(reservationData.counts)
      .map(([dimension, count]) => ({ dimension, count }))
      .filter((item) => item.count > 0);

    console.log('Selected dimensions',selectedDimensions);
    const handleBooking = async () => {
      if (validateFields()) {
        const bookingDetails = {
          lockerCode: reservationData.selectedLocker?.lockerCode,
          timestamp: timestamp,
          checkInDate: reservationData.checkInDate,
          checkOutDate: reservationData.checkOutDate,
          customerFullName: `${name} ${surname}`,
          customerEmail: email,
          customerPhoneNumber: contact,
        };
        console.log('Request booking details', bookingDetails);
        const bookingRequests = [];
        // create separate request for each dimension
        selectedDimensions.forEach(({ dimension, count }) => {
          for (let i = 0; i < count; i++) {
            const bookingRequest = axios.post(
              'https://dev.ermes-srv.com/test_priyanka/be/v8/booking/by-date',
              {
                ...bookingDetails,
                dimension,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            bookingRequests.push(bookingRequest);
          }
        });
    
        try {
          const responses = await Promise.allSettled(bookingRequests);
          const successfulBookings = responses
            .filter((res) => res.status === 'fulfilled')
            .map((res) => res.value.data.data);
    
          const failedBookings = responses.filter((res) => res.status === 'rejected');
    
          console.log('Successful bookings:', successfulBookings);
          if (failedBookings.length > 0) {
            console.log('Some bookings failed:', failedBookings);
            Swal.fire('Error!', `Unfortunately, Some of the bookings failed`, 'error');
          }
          const personalData = {
            userBooking: successfulBookings,
          };
          console.log('PersonalData', personalData);
          setUserBooking(successfulBookings);
          console.log('userbooking',userBooking);
          setPersonalData(personalData);
          localStorage.setItem('personalData', JSON.stringify(personalData));
          navigate('confirmationdetails');
        } catch (error) {
          console.error('Unexpected error:', error);
          Swal.fire('Error!', `Booking failed. ${error.message}`, 'error');
        }
      }
    };    
    
    return(
        <>
        <div className="landing">
            <div className="boxes-container">
                <div className="details-display">
                    <h3>Confirm your booking details</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Dimension</StyledTableCell>
                                    <StyledTableCell align="left">Number of Boxes</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedDimensions.map((dimension, index) => (
                                    <StyledTableRow key={index}>
                                    <StyledTableCell align="left">{dimension.dimension}</StyledTableCell>
                                    <StyledTableCell align="left">{dimension.count}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <p>Your Drop date and time: <strong>{formattedDropDate} at {formattedDropTime}</strong> </p> 
                        <p>Your Pickup date and time: <strong>{formattedPickUpDate} at {formattedPickUpTime}</strong> </p> 
                        <p>Total amount to be paid: <strong> {formatCurrency(reservationData.grandTotal, "it-IT", "EUR")}</strong></p> 
                    </div>
                </div>{/*details-display*/}
                <div className="container">
                    <h3>Enter your details to complete the booking</h3>
                    <TextField label="Name" onChange={(e)=>setName(e.target.value)}/>
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                    <TextField label="Surname" onChange={(e)=>setSurname(e.target.value)}/>
                    {errors.surname && <p style={{ color: "red" }}>{errors.surname}</p>}
                    <TextField label="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    <TextField label="Contact" onChange={(e)=>setContact(e.target.value)}/>
                    {errors.contact && <p style={{ color: "red" }}>{errors.contact}</p>}
                    <button className = "cta-button" onClick={()=>{handleBooking()}}>Book</button>
                </div>    
            </div> {/*boxes container div */}        
        </div>{/*landing div */}
        <Outlet/>
        </>
    )
}

export default PersonalDetailsPage;
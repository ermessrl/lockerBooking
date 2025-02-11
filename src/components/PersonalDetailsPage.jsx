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
    const [reservationCodes, setReservationCodes] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem("reservationData");
        if (storedData) {
            setReservationData(JSON.parse(storedData));
    }
    }, [setReservationData]);
    const generateReservationCodes = (counts) => {
        let codes = [];
        Object.keys(counts).forEach((dimension) => {
          for (let i = 0; i < counts[dimension]; i++) {
            codes.push({
              code: `${Math.floor(Math.random() * 100000000)}`.padStart(8, "0"),
              dimension: dimension,
            });
          }
        });
        return codes;
      };
    
      useEffect(() => {
        if (reservationData && reservationData.counts) {
            console.log(reservationData.counts);
          setReservationCodes(generateReservationCodes(reservationData.counts));
        }
      }, [reservationData]);
    const formattedDropDate = dayjs(reservationData.selectedDropDate).format("DD/MM/YY");
    const formattedDropTime = dayjs(reservationData.selectedDropTime).format("h:mm A");
    const formattedPickUpDate = dayjs(reservationData.selectedPickUpDate).format("DD/MM/YY");
    const formattedPickUpTime = dayjs(reservationData.selectedPickUpTime).format("h:mm A");
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [errors, setErrors] = useState({});
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
    const handleBooking = () => {
        if(validateFields()){
          const personalData = {
            reservationCodes,
            name,
            surname,
            email,
            contact
          };
          setPersonalData(personalData);
          localStorage.setItem("personalData", JSON.stringify(personalData));
          navigate("confirmationdetails");
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
                                    <StyledTableCell>Reservation Code</StyledTableCell>
                                    <StyledTableCell align="left">Dimension</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reservationCodes.map((entry, index) => (
                                    <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {entry.code}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{entry.dimension}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <p>Your Drop date and time: <strong>{formattedDropDate} at {formattedDropTime}</strong> </p> 
                        <p>Your Pickup date and time: <strong>{formattedPickUpDate} at {formattedPickUpTime}</strong> </p> 
                        <p>Total amount to be paid: <strong>€ {reservationData.grandTotal}</strong></p> 
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
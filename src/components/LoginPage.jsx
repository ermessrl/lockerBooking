import React, { useEffect, useState, useContext } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTheme } from "@mui/material/styles";
import { TextField, Button, Box, Typography, Paper, Container, CssBaseline } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { mockLockers, mockUserBookings } from "../../src/api/mockData";
import { USE_MOCK_DATA } from "../../src/config";
import { LoginDetailsContext } from "./LoginDetailsContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import dayjs from "dayjs";
import Select from '@mui/material/Select';
import axios from "axios";
const BRANDING = {
    logo: (
        <img
        src="logo.png"
        alt="BagLockers Logo"
        style={{ height: 24 }}
        />
    ),
    title: "BagLockers",
};

function LoginPage() {
    const theme = useTheme();
    const [unlockIdentifier, setUnlockIdentifier] = useState("");
    const [unlockPin, setUnlockPin] = useState("");
    const [error, setError] = useState("");
    const [userBookings, setUserBookings] = useState([]);
    const [successful, setSuccessful] = useState("");
    const { setLoginDetails } = useContext(LoginDetailsContext);
    const navigate = useNavigate();
    const [selectedLocker,setSelectedLocker] = useState(null);
    const [lockers, setLockers] = useState([]);
    const timestamp = dayjs().format('YYY-MM-DDTHH:mm:ss');

    useEffect(() => {
        if (USE_MOCK_DATA) {
        setLockers(mockLockers);
        } else {
        const fetchData = async () => {
            try {
            const response = await axios.get('https://dev.ermes-srv.com/test_priyanka/be/v8/locker/list');
            const data = response.data.data;
            setLockers(data);
            setSelectedLocker(data[0]);
            console.log('data',response.data.data);
            } catch (err) {
            console.log('error', err);
            }
        };
        fetchData();  
        }
    }, []); 
    useEffect(() => {
        if (USE_MOCK_DATA) {
            setUserBookings(mockUserBookings);
        } else {
            const fetchData = async () => {
                try {
                    const response_2 = await axios.post(
                        'https://dev.ermes-srv.com/test_priyanka/be/v8/booking/list-by-user',
                        {
                            lockerCode: selectedLocker.lockerCode,
                            timestamp: timestamp,
                            unlockIdentifier: unlockIdentifier,
                            unlockPin: unlockPin,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    setUserBookings(response_2.data.data);
                    console.log('userbookings', userBookings);
                } catch (err) {
                    console.log('error', err);
                }
            };
    
            if (selectedLocker?.lockerCode && timestamp) {
                fetchData();
            }
        }    
        const isValidUser = userBookings.some(
            (booking) =>
                booking.unlockIdentifier === unlockIdentifier &&
                booking.unlockPin === unlockPin
        );
        setSuccessful(isValidUser);
        console.log(unlockIdentifier, unlockPin, successful);
    }, [userBookings, unlockIdentifier, unlockPin, successful, selectedLocker, timestamp,]);    

    const handleLogin = async () => {
        setError("");
        if (!unlockIdentifier || !unlockPin) {
            setError("Please enter both Unlock ID and PIN.");
            return;
        }
        const loginData = {
            unlockIdentifier,
            unlockPin,
            selectedLocker,
            userBookings,
        };
        setLoginDetails(loginData);
        localStorage.setItem("loginDetails", JSON.stringify(loginData));
        if(successful)
            navigate("/login/manageBooking");
        else{
            setError("Unlock ID or PIN is incorrect. Please try again");
        }
    };

  return (
    <div className="landing">
        <CssBaseline />
        <AppProvider branding={BRANDING} theme={theme}>
            <Container maxWidth="sm"
            sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100vh" , paddingBottom: "10rem"}}>
            <Paper sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 3,
                boxShadow: 3, textAlign: "center",}}>
                <Typography variant="h5" gutterBottom> Sign In to BagLockers </Typography>
                <Box component="form" sx={{ width: "100%", mt: 2 }}>
                <TextField label="Unlock ID" variant="outlined" fullWidth margin="normal" value={unlockIdentifier}
                    onChange={(e) => setUnlockIdentifier(e.target.value)} sx={{ borderRadius: 1 }}/>
                <TextField label="Unlock PIN" type="password" variant="outlined" fullWidth margin="normal" value={unlockPin} 
                onChange={(e) => setUnlockPin(e.target.value)} sx={{ borderRadius: 1 }}/><br/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Locker</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Locker"
                        value={selectedLocker || ''}
                        onChange={(e) => setSelectedLocker(e.target.value)}
                        renderValue={(selected) =>
                            selected ? selected.lockerName : 'Select Locker'
                        }
                        sx = {{textAlign: 'left',}}
                    >
                        {lockers?.map((locker) => (
                        <MenuItem key={locker.lockerCode} value={locker} >
                            {locker.lockerName}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 3, borderRadius: 1, padding: "10px" }} onClick={handleLogin}>
                    Sign In
                </Button><br/>
                {error && <p style={{ color: "red" }}>{error}</p>}
                </Box>
            </Paper>
            </Container>
        </AppProvider>
        <Outlet/>
    </div>
  );
}

export default LoginPage;

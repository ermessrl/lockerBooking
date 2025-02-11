import React, {useState, useEffect, useContext} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ReservationContext } from "./ReservationContext";
import { TextField } from "@mui/material";
import { LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker} from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { USE_MOCK_DATA } from "../config";
import { mockDimensions, mockPromoCode } from "../api/mockData";

function ReservationPage() {

const location = useLocation();
const { setReservationData } = useContext(ReservationContext);
const navigate = useNavigate();
const selectedLocker = location?.state?.selectedLocker || {};
const [selectedDropDate, setSelectedDropDate] = useState(dayjs());
const [selectedPickUpDate, setSelectedPickUpDate] = useState(dayjs());
const [selectedDropTime, setSelectedDropTime] = useState(dayjs());
const [selectedPickUpTime, setSelectedPickUpTime] = useState(dayjs());
const calculateHoursDifference = (selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime) => {
  const dropDateTime = dayjs(selectedDropDate).hour(dayjs(selectedDropTime).hour()).minute(dayjs(selectedDropTime).minute());
  const pickUpDateTime = dayjs(selectedPickUpDate).hour(dayjs(selectedPickUpTime).hour()).minute(dayjs(selectedPickUpTime).minute());
  // difference in hours between pickup and drop time
  const hoursDifference = Math.ceil(pickUpDateTime.diff(dropDateTime, 'hour', true));
  console.log('Difference in Hours',hoursDifference)
  return hoursDifference;
};

const [dimensions, setDimensions] = useState([]); 
const [counts, setCounts] = useState({});
const [totalBagsSelected, setTotalBagsSelected] = useState(0);
const [total, setTotal] = useState(0);
const [promoCodeDiscount, setPromoCodeDiscount] = useState(0);
const [grandTotal, setGrandTotal] = useState(0);
const [showDialog, setShowDialog] = useState(false);
const [promo, setPromo] = useState("");
const [promoCodePercentage, setPromoCodePercentage] = useState(0);

useEffect(() => {
  if (USE_MOCK_DATA) {
    setDimensions(mockDimensions);
  } else {
    fetch("/api/dimensions")
      .then(response => response.json())
      .then(data => setDimensions(data))
      .catch(error => console.error("Error fetching data:", error));
  }
}, []);

// Use fetched dimensions instead of mockDimensions
const filteredDimensions = dimensions.filter(dim => dim.lockerCode === selectedLocker.lockerCode);

useEffect(() => {
  if (dimensions.length > 0) {
    const initialCounts = dimensions.reduce((acc, dim) => ({ ...acc, [dim.dimension]: 0 }), {});
    setCounts(initialCounts);
    setTotalBagsSelected(0);
  }
}, [dimensions]);

const handleClickIncrement = (dimension) => {
  setCounts(prevCounts => {
    const newCounts = { ...prevCounts, [dimension]: prevCounts[dimension] + 1 };
    updateTotalBagsSelected(newCounts);
    return newCounts;
  });
};

const handleClickDecrement = (dimension) => {
  setCounts(prevCounts => {
    const newCounts = { ...prevCounts, [dimension]: Math.max(0, prevCounts[dimension] - 1) };
    updateTotalBagsSelected(newCounts);
    return newCounts;
  });
};

// Update total bags selected
const updateTotalBagsSelected = (updatedCounts) => {
  const totalSelected = Object.values(updatedCounts).reduce((sum, count) => sum + count, 0);
  setTotalBagsSelected(totalSelected);
};

const calculatePrice = (dimension) => {
  const dimSelected = dimensions.find(dim => dim.dimension === dimension && dim.lockerCode === selectedLocker.lockerCode);
  return counts[dimension] * ((dimSelected?.price || 0) / 100);
};

// Recalculate totals when relevant values change
useEffect(() => {
  if (dimensions.length === 0) return;

  const diff_hours = calculateHoursDifference(selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime);

  // Calculate total price
  const calculateTotalPrice = () => {
    return dimensions.reduce((total, dim) => total + (counts[dim.dimension] || 0) * ((dim.price || 0) / 100), 0);
  };

  const price = calculateTotalPrice();
  const totalPrice = diff_hours * price;
  const discountAmount = (totalPrice * (promoCodePercentage || 0)) / 100;
  const finalTotal = totalPrice - discountAmount;

  setPromoCodeDiscount(discountAmount);
  setTotal(totalPrice);
  setGrandTotal(finalTotal);

}, [selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime, promoCodePercentage, counts, dimensions]);


// Fetch Promo Code Data
useEffect(() => {
  if (USE_MOCK_DATA) {
    setPromo(mockPromoCode);
  } else {
    fetch("/api/promoCode")
      .then(response => response.json())
      .then(data => setPromo(data))
      .catch(error => console.error("Error fetching promo codes:", error));
  }
}, []);

// Handle Promo Code Input
const handlePromoCode = (enteredPromo) => {
  console.log("Promo code entered:", enteredPromo);
  const promoEntered = mockPromoCode.find(promocode => 
    promocode.promo === enteredPromo && promocode.lockerCode === selectedLocker.lockerCode
  );

  if (promoEntered) {
    setPromoCodePercentage(promoEntered.promoCodePercentage);
    console.log("Valid Promo Applied:", promoEntered.promoCodePercentage, "%");
  } else {
    alert("Enter a valid coupon or promo code");
    setPromoCodePercentage(0);
  }
};

// Price Calculation with Promo Code Discount
useEffect(() => {
  if (dimensions.length === 0) return;

  const diff_hours = calculateHoursDifference(selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime);

  // Calculate total price before discount
  const calculateTotalPrice = () => {
    return dimensions.reduce((total, dim) => 
      total + (counts[dim.dimension] || 0) * ((dim.price || 0) / 100), 
    0);
  };

  const price = calculateTotalPrice();
  const totalPrice = diff_hours * price;

  // Apply promo discount
  const discountAmount = (totalPrice * promoCodePercentage) / 100;
  const finalTotal = totalPrice - discountAmount;

  console.log("Difference in hours:", diff_hours);
  console.log("Price per hour:", price);
  console.log("Total Price (before discount):", totalPrice);
  console.log("Discount:", discountAmount);
  console.log("Grand total (after discount):", finalTotal);

  setPromoCodeDiscount(discountAmount);
  setTotal(totalPrice);
  setGrandTotal(finalTotal);

}, [selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime, promoCodePercentage, dimensions, counts]);
//const [errors, setErrors] = useState({});
const handleButtonClick = () => {
  const reservationDetails = {
    selectedLocker,
    selectedDropDate,
    selectedDropTime,
    selectedPickUpDate,
    selectedPickUpTime,
    counts,
    grandTotal,
  };
//   const validateFields = () => {
//     let tempErrors = {};
//     if (!selectedDropDate) tempErrors.selectedDropDate = "Please select the drop date";
//     if (!selectedDropTime) tempErrors.selectedDropTime = "Please select the drop time";
//     if (!selectedPickUpDate) tempErrors.selectedPickUpDate = "Please select the pickup date";
//     if (!selectedPickUpTime) tempErrors.selectedPickUpTime = "Please select the pickup time";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0; 
// };
  setReservationData(reservationDetails);
  localStorage.setItem("reservationData", JSON.stringify(reservationDetails));
  if(reservationDetails.grandTotal !==0){
    navigate("personaldetails");
  }
  else
  {
    alert('Price cannot be empty.')
  }
};

return (
    <>
      <div className="landing ">
        <div className="boxes-container">
          <div className = "box">
            <h3>{selectedLocker.lockerName}</h3>
            <p><i className="fa-solid fa-clock icon"></i><strong>Open:</strong> {selectedLocker.openingTime} - {selectedLocker.closingTime}</p>
            <p><i className="fa-solid fa-location-dot icon"></i> {selectedLocker.city}</p>
            <p><i className="fa-solid fa-building icon"></i> {selectedLocker.address}</p>
          </div>
          <div className = "box_reservation_details">
              <div className = "box_datetime">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker  label = "Select Drop Date" value={selectedDropDate} disablePast onChange={(newDate) =>  setSelectedDropDate(newDate)}/>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label = "Select Drop Time" value={selectedDropTime} disablePast onChange={(newTime) =>  setSelectedDropTime(newTime)}/>
              </LocalizationProvider>
              </div>
              <div className = "box_datetime">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label = "Select Pickup Date" value={selectedPickUpDate} disablePast minDate={selectedDropDate} onChange={(newDate) =>  setSelectedPickUpDate(newDate)}/>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label = "Select Pickup Time" value={selectedPickUpTime} disablePast minTime={selectedDropTime} onChange={(newTime) =>  setSelectedPickUpTime(newTime)}/>
              </LocalizationProvider>
              </div>
              <div className="container">
                <div style={{display:"flex", flexDirection:"row", gap:"2rem"}}>
                <p style={{paddingTop:"2rem"}}>Total Boxes Selected: {totalBagsSelected}</p>
                <button onClick={() => setShowDialog(true)} className="dialog-button">
                  Select Boxes
                </button>
                </div>
                <div>
                  {showDialog && (
                    <div className="dialog-overlay">
                      <div className="dialog-box">
                        <h2 className="dialog-title">Select Your Boxes</h2>
                        <div className="box-list">
                          {filteredDimensions.map((dim) => (
                            <div key={dim.id} className="box-item">
                              <div className="dimension-label">{dim.dimension}</div>
                              
                              <div className="counter-group">
                                <button className="cnt-button" onClick={() => handleClickDecrement(dim.dimension)}>-</button>
                                <div className="count">{counts[dim.dimension]}</div>
                                <button className="cnt-button" onClick={() => handleClickIncrement(dim.dimension)}>+</button>
                              </div>

                              <div className="price"> €{calculatePrice(dim.dimension)} per hour</div>
                            </div>
                          ))}
                        </div>

                        {/* Close button */}
                        <button onClick={() => setShowDialog(false)} className="dialog-button">
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="box_datetime">
                  <TextField label = 'Have a coupon or promo code? ' variant="outlined" onChange={(e)=>setPromo(e.target.value)}/>
                  <button className="cnt-button" onClick={() => handlePromoCode(promo)}>Apply</button>
                </div>
                <div className="total-summary" >
                  <div className="box_datetime">
                    <p className="summary-label">Total: </p><p>€{total}</p>
                  </div>
                  <div className="box_datetime">
                  <p className="summary-label">Discount: </p><p>{promoCodePercentage} % </p>
                  </div>
                  <div className="box_datetime">
                  <p className="summary-label">You Saved: </p><p>- €{(promoCodeDiscount).toFixed(2)}</p>
                  </div>
                  <div className="box_datetime">
                  <p className="summary-label">Grand Total: </p><p>€{grandTotal}</p>
                  </div>
                  <button
                    className="cta-button"
                    onClick={handleButtonClick}
                    data-it=""
                    data-en="CONFIRM"
                    data-fr=""
                    data-de=""
                    data-es=""
                    data-zh=""
                    data-ja=""
                    data-ru=""
                    >
                    CONFIRM
                    </button>
                </div>
              </div>
            </div>
        </div>                   
        <Outlet/>
      </div>
    </>
  );
}

export default ReservationPage;

import React, {useState, useEffect, useContext, useMemo} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ReservationContext } from "./ReservationContext";
import { TextField } from "@mui/material";
import { LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker} from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from 'dayjs';
import { USE_MOCK_DATA } from "../../src/config";
import { mockDimensions, mockPromoCode } from "../../src/api/mockData";
import Swal from "sweetalert2";
import axios from "axios";
function ReservationPage() {

const location = useLocation();
const { setReservationData } = useContext(ReservationContext);
const navigate = useNavigate();
const selectedLocker = useMemo(() => location?.state?.selectedLocker || {}, [location?.state?.selectedLocker]);
const [selectedDropDate, setSelectedDropDate] = useState(dayjs());;
const [selectedPickUpDate, setSelectedPickUpDate] = useState(dayjs());;
const [selectedDropTime, setSelectedDropTime] = useState(dayjs().add(5, 'minutes'));
const [selectedPickUpTime, setSelectedPickUpTime] = useState(dayjs());;
const [dimensions, setDimensions] = useState([]);
const [counts, setCounts] = useState([]);
const [totalBagsSelected, setTotalBagsSelected] = useState(0);
const [total, setTotal] = useState(0);
const [promoCodeDiscount, setPromoCodeDiscount] = useState(0);
const [grandTotal, setGrandTotal] = useState(0);
const [showDialog, setShowDialog] = useState(false);
const [promo, setPromo] = useState("");
const [promoCodePercentage, setPromoCodePercentage] = useState(0);
const checkInDate = selectedDropTime.format('YYYY-MM-DDTHH:mm:ss');
const checkOutDate = selectedPickUpTime.format('YYYY-MM-DDTHH:mm:ss');
const timestamp = dayjs().format('YYY-MM-DDTHH:mm:ss');

useEffect(() => {
  if (USE_MOCK_DATA) {
    setDimensions(mockDimensions);
  } else {
    const fetchData = async () => {
      try {
        console.log({
          lockerCode: selectedLocker.lockerCode,
          timestamp: timestamp,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        });
        const response = await axios.post(
          'https://dev.ermes-srv.com/test_priyanka/be/v8/box/available-by-date',
          {
            lockerCode: selectedLocker.lockerCode,
            timestamp: timestamp,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setDimensions(response.data.data);
        console.log('available boxes',response.data.data);
      } catch (err) {
        console.error('error', err);
      }
    };

    if (selectedLocker.lockerCode && timestamp) {
      fetchData();
    }
  }
}, [selectedLocker, checkInDate, checkOutDate, timestamp]);

// const calculateHoursDifference = (selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime) => {
//   const dropDateTime = dayjs(selectedDropDate).hour(dayjs(selectedDropTime).hour()).minute(dayjs(selectedDropTime).minute());
//   const pickUpDateTime = dayjs(selectedPickUpDate).hour(dayjs(selectedPickUpTime).hour()).minute(dayjs(selectedPickUpTime).minute());
//   // difference in hours between pickup and drop time
//   const hoursDifference = Math.ceil(pickUpDateTime.diff(dropDateTime, 'hour', true));
//   console.log('Difference in Hours',hoursDifference)
//   return hoursDifference;
// };

// const diffHours = useMemo(() => {
//   return calculateHoursDifference(
//     selectedDropDate,
//     selectedDropTime,
//     selectedPickUpDate,
//     selectedPickUpTime
//   );
// }, [selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime]);
// const dimensions = useMemo(() => {
//   const dimensionMap = {};
//   dimensions
//     .filter(dim => dim.lockerCode === selectedLocker?.lockerCode)
//     .forEach(dim => {
//       if(diffHours!==0){
//       if (dim.timePeriod >= diffHours) {
//         if (!dimensionMap[dim.dimension] || dim.timePeriod < dimensionMap[dim.dimension].timePeriod) {
//           dimensionMap[dim.dimension] = dim;
//         }
//       }
//     }}
//   );
//   return Object.values(dimensionMap);
// }, [dimensions, selectedLocker, diffHours]);
// console.log('filtered dimension before loop', dimensions);
// useEffect(() => {
//   setDiffHours(calculateHoursDifference(selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime));
//   if (dimensions.length > 0) {
//     const initialCounts = dimensions.reduce((acc, dim) => ({ ...acc, [dim.dimension]: 0 }), {});
//     setCounts(initialCounts);
//     setTotalBagsSelected(0);
//   }
// }, [dimensions, selectedDropDate, selectedDropTime, selectedPickUpDate, selectedPickUpTime]);
// useEffect(() => {
//   Object.keys(counts).forEach(dimension => {
//     const selectedDim = dimensions.find(dim => dim.dimension === dimension);
//     if (selectedDim && counts[dimension] > selectedDim.qty) {
//       Swal.fire('Error!',`No more boxes available for ${dimension}`,'error');
//       setCounts(prevCounts => ({ ...prevCounts, [dimension]: selectedDim.qty }));
//     }
//   });
// }, [counts, dimensions]);


// const handleClickIncrement = (dimension) => {
//   setCounts(prevCounts => {
//     const currentCount = prevCounts[dimension] || 0;

//     const selectedDim = dimensions.find(dim => dim.dimension === dimension);
//     console.log('dim', dimensions[0].dimension);
//     if (!selectedDim) return prevCounts;

//     const maxCount = selectedDim.qty;
    
//     console.log('current count:', currentCount);
//     console.log('max count:', maxCount);

//     if (currentCount >= maxCount) {
//       return prevCounts;
//     }
//     const newCounts = { ...prevCounts, [dimension]: currentCount + 1 };
    
//     console.log('prevCounts:', prevCounts);
//     console.log('newCounts:', newCounts);
//     updateTotalBagsSelected(newCounts);
//     return newCounts;
//   });
// };

// const handleClickDecrement = (dimension) => {
//   setCounts(prevCounts => {
//     const newCounts = { ...prevCounts, [dimension]: Math.max(0, prevCounts[dimension] - 1) };
//     updateTotalBagsSelected(newCounts);
//     return newCounts;
//   });
// };


// const updateTotalBagsSelected = (updatedCounts) => {
//   const totalSelected = Object.values(updatedCounts).reduce((sum, count) => sum + count, 0);
//   console.log('total selected', totalSelected);
//   setTotalBagsSelected(totalSelected);
// };
useEffect(() => {
  if (selectedDropTime) {
    const oneHourLater = dayjs(selectedDropTime).add(1, 'hour');
    setSelectedPickUpTime(oneHourLater);
  }
}, [selectedDropTime]);
useEffect(() => {
  if (dimensions.length > 0 && Object.keys(counts).length === 0) {
    const initialCounts = dimensions.reduce((acc, dim) => ({ ...acc, [dim.dimension]: 0 }), {});
    setCounts(initialCounts);
    setTotalBagsSelected(0);
  }
}, [dimensions,counts]);
useEffect(() => {
  Object.keys(counts).forEach((dimension) => {
    const selectedDim = dimensions.find((dim) => dim.dimension === dimension);
    if (selectedDim && counts[dimension] > selectedDim.qty) {
      Swal.fire('Error!', `No more boxes available for ${dimension}`, 'error');
      setCounts((prevCounts) => ({ ...prevCounts, [dimension]: selectedDim.qty }));
    }
  });
}, [counts, dimensions]);

const handleClickIncrement = (dimension) => {
  setCounts((prevCounts) => {
    const currentCount = prevCounts[dimension] || 0;

    const selectedDim = dimensions.find((dim) => dim.dimension === dimension);
    if (!selectedDim) return prevCounts;

    const maxCount = selectedDim.qty;

    if (currentCount >= maxCount) {
      return prevCounts;
    }
    const newCounts = { ...prevCounts, [dimension]: currentCount + 1 };
    updateTotalBagsSelected(newCounts);
    return newCounts;
  });
};

const handleClickDecrement = (dimension) => {
  setCounts((prevCounts) => {
    const newCounts = { ...prevCounts, [dimension]: Math.max(0, prevCounts[dimension] - 1) };
    updateTotalBagsSelected(newCounts);
    return newCounts;
  });
};

const updateTotalBagsSelected = (updatedCounts) => {
  const totalSelected = Object.values(updatedCounts).reduce((sum, count) => sum + count, 0);
  setTotalBagsSelected(totalSelected);
};

const handlePromoCode = (promo) => {
  console.log("Promo code entered:", promo);

  if (USE_MOCK_DATA) {
    setPromo(mockPromoCode);
  } else {
    // Make the API call only when clicking "Apply"
    if (promo && promo.trim() !== "" && selectedLocker && timestamp) {
      const fetchPromoCode = async () => {
        try {
          console.log('Promocode request', {
            lockerCode: selectedLocker.lockerCode,
            timestamp: timestamp,
            promoCode: promo,
          });

          const response = await axios.post(
            'https://dev.ermes-srv.com/test_priyanka/be/v8/promocode',
            {
              lockerCode: selectedLocker.lockerCode,
              timestamp: timestamp,
              promoCode: promo,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.data && response.data.data) {
            setPromoCodePercentage(response.data.data.promoCodePercentage);
            console.log('Promo data:', response.data.data);
            Swal.fire('Success!', `Promo code with ${response.data.data.promoCodePercentage}% off is applied successfully`, 'success');
          } else {
            setPromoCodePercentage(0);
            Swal.fire('Warning!', 'Invalid promo code. Please try again.', 'warning');
          }
        } catch (err) {
          console.error('Error fetching promo code data', err);
          Swal.fire('Error!', 'Failed to validate promo code. Please try later.', 'error');
        }
      };

      fetchPromoCode();
    } else {
      console.log('Promo code is empty.');
      setPromoCodePercentage(0);
      Swal.fire('Warning!', 'Enter a valid promo code.', 'warning');
    }
  }
};


useEffect(() => {
  if (dimensions.length === 0) return;
  const calculateTotalPrice = () => {
    return dimensions.reduce((total, dim) => {
      const selectedQty = counts[dim.dimension] || 0;
      total = total + selectedQty  * ((dim.price || 0) / 100);
      console.log('total and price, selected qty', total, dim.price, selectedQty);
      return total;
    },
    0);
  };

  const totalPrice = calculateTotalPrice();

  // Apply promo discount
  const discountAmount = (totalPrice * promoCodePercentage) / 100;
  const finalTotal = totalPrice - discountAmount;

  console.log("Total Price (before discount):", totalPrice);
  console.log("Discount:", discountAmount);
  console.log("Grand total (after discount):", finalTotal);

  setPromoCodeDiscount(discountAmount);
  setTotal(totalPrice);
  setGrandTotal(finalTotal);

}, [promoCodePercentage, dimensions, counts]);

//const [errors, setErrors] = useState({});
const handleButtonClick = () => {
  const reservationDetails = {
    selectedLocker,
    checkInDate,
    checkOutDate,
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
    Swal.fire('Error!','Price cannot be empty.','error');
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
            <p><i className="fa-solid fa-phone icon"></i> {selectedLocker.lockerPhone} </p>
            <p><i className="fa-solid fa-envelope icon"></i> {selectedLocker.lockerEmail} </p>
          </div>
          <div className = "box_reservation_details">
              <div className = "box_datetime">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker  label = "Select Drop Date" format="DD/MM/YYYY" value={selectedDropDate} disablePast onChange={(newDate) =>  setSelectedDropDate(newDate)}/>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker label = "Select Drop Time" ampm={false} value={selectedDropTime} disablePast onChange={(newTime) =>  setSelectedDropTime(newTime)}/>
                </LocalizationProvider>
                </div>
                <div className = "box_datetime">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label = "Select Pickup Date" format="DD/MM/YYYY" value={selectedPickUpDate} disablePast minDate={selectedDropDate} onChange={(newDate) =>  setSelectedPickUpDate(newDate)}/>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker label = "Select Pickup Time" ampm={false} value={selectedPickUpTime} disablePast minTime={selectedDropTime ? dayjs(selectedDropTime).add(1, 'hour') : null} onChange={(newTime) =>  setSelectedPickUpTime(newTime)}/>
                </LocalizationProvider>
              </div>
              <div className="container">
                <div style={{display:"flex", flexDirection:"row", gap:"2rem"}}>
                <p style={{paddingTop:"2rem"}}>Total Boxes Selected: {totalBagsSelected}</p>
                <button  onClick={() => {    
                    if (dimensions.length === 0) {
                      Swal.fire('Error!','No boxes available for the selected timeslot. Please select a different timeslot.','error');
                    } else {
                      setShowDialog(true);
                    }
                  }}
                  className="dialog-button"
                >
                  Select Boxes
                </button>
                </div>
                <div>
                  {showDialog && (
                    <div className="dialog-overlay">
                      <div className="dialog-box">
                        <h2 className="dialog-title">Select Your Boxes</h2>
                        <div className="box-list">  
                          {dimensions.map((dim) => (
                            <div key={`${dim.lockerCode}-${dim.dimension}`} className="box-item">
                              <div className="dimension-label">{dim.dimension}</div> 
                              <div className="counter-group">
                                <button className="cnt-button" onClick={() => handleClickDecrement(dim.dimension)}>-</button>
                                <div className="count">{counts[dim.dimension]}</div>
                                <button className="cnt-button" onClick={() => handleClickIncrement(dim.dimension)}>+</button>
                              </div>
                              <div className="price"> €{dim.price/100} per hour</div>
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

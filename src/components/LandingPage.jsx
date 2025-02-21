import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DEFAULT_PAGE = 1;  
const DEFAULT_PAGE_SIZE = 3;

function LandingPage() {
  const navigate = useNavigate();
  const [lockers, setLockers] = useState([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [selectedLocker,setSelectedLocker] = useState(null);
  useEffect(() => {
      const lockerData = localStorage.getItem("lockerData");
      if (lockerData) {
          setLockers(JSON.parse(lockerData));
      }
    }, [setLockers]);  

  const handleLockerClick = (locker) => {
    setSelectedLocker(locker);
    navigate("reserve", { state: { selectedLocker: locker } });
  };

  /*const handleContinueClick = () => {
    if (selectedLocker) {
      navigate("reserve", { state: { selectedLocker } });
    } else {
      alert("Please select a locker before continuing.");
    }
  };*/

  //choose which lockers to display
  const indexOfLastLocker = currentPage*DEFAULT_PAGE_SIZE; //3,6,..
  const indexOfFirstLocker = indexOfLastLocker - DEFAULT_PAGE_SIZE;//0,3,..
  const currentLockers =  lockers.slice(indexOfFirstLocker,indexOfLastLocker);
  const handlePageChange = (pageNumber) =>{
    setCurrentPage(pageNumber);
  };
  // to decide how many pages to display inorder to accomodate the lockers available.
  const totalPages = Math.ceil(lockers.length/DEFAULT_PAGE_SIZE);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="landing">
      <h4><strong>Worried about carrying luggages everywhere you go? We are here to take care of your luggages while you wander hassle-free.</strong></h4>
      {/* Second Paragraph */}<br/>
      <h4><strong>Book your lockers online and get yourself a guaranteed locker now. Select a locker and proceed.</strong></h4><br/>
      <div className={`boxes-container ${currentLockers.length === 1? 'one-locker': currentLockers.length === 2? 'two-lockers': ''}`}>
        {/* Display lockers */}
        {currentLockers.map((locker) => (
          <div key={locker.lockerCode} className={`box ${selectedLocker?.lockerCode === locker.lockerCode ? 'active' : ''}`} onClick={() => handleLockerClick(locker)}>
            <h3>{locker.lockerName}</h3>
            <p><i className="fa-solid fa-clock icon"></i><strong>Open:</strong> {locker.openingTime} - {locker.closingTime}</p>
            <p><i className="fa-solid fa-location-dot icon"></i> {locker.city} </p>
            <p><i className="fa-solid fa-building icon"></i> {locker.address} </p>
            <p><i className="fa-solid fa-phone icon"></i> {locker.lockerPhone} </p>
            <p><i className="fa-solid fa-envelope icon"></i> {locker.lockerEmail} </p>
          </div>
        ))}
      </div>
      
      {/*Pagination */}
      <div className="pagination">
      {pageNumbers.map((number) => (
        <button key = {number} className={`pagination-button ${number === currentPage ? 'active' : ''}`} onClick={()=>handlePageChange(number)}>
          {number}
        </button>
        
      ))}
      </div>
      <Outlet/>
    </div>
  );
}

export default LandingPage;
